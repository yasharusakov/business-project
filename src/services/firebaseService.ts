import {getFirestore, collection, getDocs, doc, getDoc, updateDoc, deleteDoc, setDoc, serverTimestamp, onSnapshot, query, orderBy, OrderByDirection, where, limit, startAfter} from "firebase/firestore"
import {uploadBytes, getDownloadURL, ref, getStorage, deleteObject, listAll} from 'firebase/storage'
import {ICategory} from "../types/ICategory"
import {IProduct} from "../types/IProduct"
import {IProductInCart} from "../types/IProductInCart"
import {IOrder} from "../types/IOrder"

class FirebaseService {
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