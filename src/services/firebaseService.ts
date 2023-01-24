import {getFirestore, collection, getDocs, doc, getDoc, updateDoc, deleteDoc, setDoc, serverTimestamp, onSnapshot} from "firebase/firestore"
import {uploadBytes, getDownloadURL, ref, getStorage, deleteObject} from 'firebase/storage'
import {ICategory} from "../types/ICategory"
import {IProduct} from "../types/IProduct"
import {IProductCharacteristic} from "../types/IProductCharacteristic"

class FirebaseService {

    async getCategories() {
        try {
            const db = getFirestore()
            const collectionRef = collection(db, '/categories')
            const docsSnapshot = await getDocs(collectionRef)
            const docsData = docsSnapshot.docs.map<ICategory>(doc => ({...doc.data(), id: doc.id} as ICategory))
            return docsData
        } catch (err) {
            console.log(err)
        }
    }

    listenData(setData: (data: any) => void, path: string) {
        try {
            const db = getFirestore()
            const collectionRef = collection(db, path)
            const unsub = onSnapshot(collectionRef, (querySnapshot) => {
                const docsData = querySnapshot.docs.map<any>(doc => ({...doc.data(), id: doc.id} as any))
                setData(docsData)
            })
            return unsub
        } catch (err) {
            console.log(err)
        }
    }

    async deleteCategory(categoryId: string, categoryName: string) {
        try {

            const confirmDelete = window.confirm(`Ви дійсно хочете видалити категорію ${categoryName}?`)

            if (confirmDelete && categoryId) {
                const db = getFirestore()
                const docRef = doc(db, `/categories/${categoryId}`)

                await deleteDoc(docRef)
            }
        } catch (err) {
            console.log(err)
        }
    }

    async getProducts(categoryId: string) {
        try {
            const db = getFirestore()
            const collectionRef = collection(db, `/categories/${categoryId}/items`)
            const docsSnapshot = await getDocs(collectionRef)
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

            const docRef2 = collection(db, `/categories/${categoryId}/items/${productId}/characteristics`)
            const docsSnapshot2 = await getDocs(docRef2)
            const docsData2 = docsSnapshot2.docs.map(doc => ({...doc.data(), id: doc.id} as IProductCharacteristic))

            return {
                product: docData,
                characteristics: docsData2
            }
        } catch (err) {
            console.log(err)
        }
    }

    async upload(file: File, categoryId: string) {
        try {
            const storage = getStorage()
            const storageRef = ref(storage, `categories/${categoryId}/picture`)
            await uploadBytes(storageRef, file)
            return await getDownloadURL(storageRef)
        } catch (err) {
            console.log(err)
        }
    }

    async deleteMedia(categoryId: string) {
        try {
            const storage = getStorage()
            const storageRef = ref(storage, `categories/${categoryId}/picture`)
            await deleteObject(storageRef)
        } catch (err) {
            console.log(err)
        }
    }

    async createCategory(url: string, categoryId: string, categoryTitle: string) {
        try {
            const db = getFirestore()
            const docRef = doc(db, 'categories', categoryId)
            await setDoc(docRef, {
                url: url,
                title: categoryTitle,
                timestamp: serverTimestamp()
            })
        } catch (err) {
            console.log(err)
        }
    }

    async editCategory(url: string, categoryId: string, categoryTitle: string) {
        try {
            const db = getFirestore()
            const docRef = doc(db, 'categories', categoryId)

            if (!url) {
                await updateDoc(docRef, {
                    title: categoryTitle
                })
            } else {
                await updateDoc(docRef, {
                    url: url,
                    title: categoryTitle
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export default new FirebaseService()