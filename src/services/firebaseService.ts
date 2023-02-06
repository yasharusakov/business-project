import {getFirestore, collection, getDocs, doc, getDoc, updateDoc, deleteDoc, setDoc, serverTimestamp, onSnapshot, query, orderBy, OrderByDirection, where, limit, startAfter} from "firebase/firestore"
import {uploadBytes, getDownloadURL, ref, getStorage, deleteObject, listAll} from 'firebase/storage'
import {ICategory} from "../types/ICategory"
import {IProduct} from "../types/IProduct"
import {IProductInCart} from "../types/IProductInCart"
import {IOrder} from "../types/IOrder"

class FirebaseService {

    async getCategories() {
        try {
            const db = getFirestore()
            const collectionRef = collection(db, '/categories')
            const q = query(collectionRef, orderBy('timestamp'))
            const docsSnapshot = await getDocs(q)
            const docsData = docsSnapshot.docs.map<ICategory>(doc => ({...doc.data(), id: doc.id} as ICategory))
            return docsData
        } catch (err) {
            console.log(err)
        }
    }

    listenData(setData: {(data: any): void}, path: string, orderByValue: OrderByDirection) {
        try {
            const db = getFirestore()
            const collectionRef = collection(db, path)
            const q = query(collectionRef, orderBy('timestamp', orderByValue))
            const unsub = onSnapshot(q, (querySnapshot) => {
                const docsData = querySnapshot.docs.map<any>(doc => ({...doc.data(), id: doc.id} as any))
                setData(docsData)
            })
            return unsub
        } catch (err) {
            console.log(err)
        }
    }

    async deleteData({categoryId, productId, name}: {categoryId: string, productId?: string, name: string}) {
        try {
            const db = getFirestore()
            const storage = getStorage()
            const storageRef = productId ? ref(storage, `/categories/${categoryId}/pictures/${productId}`) : ref(storage, `/categories/${categoryId}/picture`)
            const docRef = productId ? doc(db, `/categories/${categoryId}/items/${productId}`) : doc(db, `/categories/${categoryId}`)

            const confirmDelete = window.confirm(`Ви дійсно хочете видалити ${name}?`)

            if (productId) {
                if (confirmDelete && categoryId && productId) {
                    await deleteDoc(docRef)
                    await deleteObject(storageRef)
                }
            } else {
                if (confirmDelete && categoryId) {
                    const list = ref(storage, `/categories/${categoryId}/pictures`)
                    await deleteDoc(docRef)
                    await listAll(list)
                        .then(async list => {
                            for (const ref of list.items) {
                                await deleteObject(ref)
                            }
                        })
                        .then(async () => {
                            await deleteObject(storageRef)
                        })
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    async getProducts(categoryId: string) {
        try {
            const db = getFirestore()
            const collectionRef = collection(db, `/categories/${categoryId}/items`)
            const q = query(collectionRef, orderBy('timestamp'))
            const docsSnapshot = await getDocs(q)
            const docsData = docsSnapshot.docs.map<IProduct>(doc => ({...doc.data(), id: doc.id} as IProduct))
            return docsData
        } catch (err) {
            console.log(err)
        }
    }

    async getProduct(categoryId: string, productId: string) {
        try {
            const db = getFirestore()
            const docRef = doc(db, `/categories/${categoryId}/items/${productId}`)
            const docSnapshot = await getDoc(docRef)
            const docData = docSnapshot.data() as IProduct

            return docData
        } catch (err) {
            console.log(err)
        }
    }

    async upload({name, file, categoryId, productId}: {name: 'category' | 'product', file: File, categoryId?: string, productId?: string}) {
        try {
            const storage = getStorage()
            const storageRef = name === 'category' ? ref(storage, `categories/${categoryId}/picture`) : ref(storage, `categories/${categoryId}/pictures/${productId}`)
            await uploadBytes(storageRef, file)
            return await getDownloadURL(storageRef)
        } catch (err) {
            console.log(err)
        }
    }

    async createCategory(categoryTitle: string, file: File) {
        try {
            const db = getFirestore()
            const id = doc(collection(db, '/id')).id
            const docRef = doc(db, 'categories', id)

            await this.upload({name: 'category', categoryId: id, file})
                .then(async url => {
                    await setDoc(docRef, {
                        url: url,
                        title: categoryTitle,
                        timestamp: serverTimestamp()
                    })
                })
        } catch (err) {
            console.log(err)
        }
    }

    async editCategory({file, categoryId, categoryTitle}: {file: File | null, categoryId: string, categoryTitle: string}) {
        try {
            const db = getFirestore()
            const docRef = doc(db, 'categories', categoryId)

            if (!file) {
                await updateDoc(docRef, {
                    title: categoryTitle
                })
            } else {
                await this.upload({name: 'category', file, categoryId})
                    .then(async url => {
                        await updateDoc(docRef, {
                            url: url,
                            title: categoryTitle
                        })
                    })
            }
        } catch (err) {
            console.log(err)
        }
    }


    async createProduct(categoryId: string, id: string, url: string, title: string, price: number, characteristics: string) {
        const db = getFirestore()
        const docRef = doc(db, `categories/${categoryId}/items`, id)
        await setDoc(docRef, {
            url: url,
            title: title,
            price: +price,
            characteristics: characteristics,
            orders: 0,
            timestamp: serverTimestamp()
        })
    }

    async editProduct({file, categoryId, productId, title, price, characteristics}: {file: File | null, categoryId: string, productId: string, title: string, price: number, characteristics: string}) {
        try {
            const db = getFirestore()
            const docRef = doc(db, `categories/${categoryId}/items`, productId)

            if (!file) {
                await updateDoc(docRef, {
                    title: title,
                    price: price,
                    characteristics: characteristics
                })
            } else {
                await this.upload({name: 'category', file, categoryId})
                    .then(async url => {
                        await updateDoc(docRef, {
                            url: url,
                            title: title,
                            price: price,
                            characteristics: characteristics
                        })
                    })
            }
        } catch (err) {
            console.log(err)
        }
    }

    async createOrder(fullName: string, phoneNumber: string, address: string, products: IProductInCart[]) {
        const db = getFirestore()

        const id = doc(collection(getFirestore(), '/id')).id

        const docRef = doc(db, 'orders', id)

        await setDoc(docRef, {
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address,
            products: products,
            viewed: false,
            timestamp: serverTimestamp()
        })
    }

    getOrders(setData: { (data: any): void }) {
        const unsub = this.listenData(setData, 'orders', 'desc')
        return unsub
    }

    async createQuestion({fullName, phoneNumber, question}: {fullName: string, phoneNumber: string, question: string}) {
        if (!fullName || !phoneNumber || !question) return

        const db = getFirestore()

        const id = doc(collection(getFirestore(), '/id')).id

        const docRef = doc(db, 'questions', id)

        await setDoc(docRef, {
            fullName: fullName,
            phoneNumber: phoneNumber,
            question: question,
            viewed: false,
            timestamp: serverTimestamp()
        })
    }

    getQuestions(setData: {(data: any): void}) {
        const unsub = this.listenData(setData, 'questions', 'desc')
        return unsub
    }

    checkViewed(setViewed: {(viewed: boolean): void}, path: string) {
        const db = getFirestore()
        const docRef = doc(db, path)
        const unsub = onSnapshot(docRef, (querySnapshot) => {
            setViewed((querySnapshot.data() as IOrder).viewed)
        })
        return unsub
    }

    async updateViewed(path: string) {
        const db = getFirestore()
        const docRef = doc(db, path)
        await updateDoc(docRef, {
            viewed: true
        })
    }

    getCountOfNotViewed(setCount: {(count: number): void}, path: string) {
        const db = getFirestore()
        const collectionRef = collection(db, path)
        const q = query(collectionRef, where('viewed', '==', false))
        const unsub = onSnapshot(q, (querySnapshot) => {
            setCount(querySnapshot.docs.length)
        })
        return unsub
    }
}

export default new FirebaseService()