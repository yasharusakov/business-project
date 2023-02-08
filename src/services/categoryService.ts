import {collection, doc, getDoc, getDocs, getFirestore, orderBy, query, serverTimestamp, setDoc, updateDoc} from "firebase/firestore"
import UploadService from "./uploadService"
import {ICategory} from "../types/ICategory"

class CategoryService {
    async getCategories() {
        try {
            const db = getFirestore()
            const collectionRef = collection(db, 'categories')
            const q = query(collectionRef, orderBy('timestamp'))
            const docsSnapshot = await getDocs(q)
            return docsSnapshot.docs.map(doc => ({...doc.data(), id: doc.id} as ICategory))
        } catch (err) {
            console.log(err)
        }
    }

    async getCategory(categoryId: string) {
        try {
            const db = getFirestore()
            const docRef = doc(db, `/categories/${categoryId}`)
            const docSnapshot = await getDoc(docRef)
            return docSnapshot.data() as ICategory
        } catch (err) {
            console.log(err)
        }
    }

    async createCategory(file: File, title: string) {
        try {
            const db = getFirestore()
            const categoryId = doc(collection(db, 'id')).id
            const docRef = doc(db, 'categories', categoryId)
            await UploadService.uploadOneImageForCategory(file, categoryId)
                .then(async url => {
                    await setDoc(docRef, {
                        url: url,
                        title: title,
                        timestamp: serverTimestamp()
                    })
                })
        } catch (err) {
            console.log(err)
        }
    }

    async editCategory(file: File | null, categoryId: string, title: string) {
        try {
            const db = getFirestore()
            const docRef = doc(db, 'categories', categoryId)

            if (!file) {
                await updateDoc(docRef, {
                    title: title
                })
            } else {
                await UploadService.uploadOneImageForCategory(file, categoryId)
                    .then(async url => {
                        await updateDoc(docRef, {
                            url: url,
                            title: title
                        })
                    })
            }
        } catch (err) {
            console.log(err)
        }
    }

    // async deleteCategory(categoryId: string) {
    //     try {
    //         const db = getFirestore()
    //         const storage = getStorage()
    //         const storageRef = ref(storage, `categories/${categoryId}/image`)
    //         const docRef = doc(db, `categories/${categoryId}`)
    //
    //         const confirmDelete = window.confirm(`Ви дійсно хочете видалити категорію?`)
    //
    //         if (confirmDelete && categoryId) {
    //             const list = ref(storage, `categories/${categoryId}/image/images`)
    //             await deleteDoc(docRef)
    //             await listAll(list)
    //                 .then(async list => {
    //                     for (const ref of list.items) {
    //                         await deleteObject(ref)
    //                     }
    //                 })
    //                 .then(async () => {
    //                     await deleteObject(storageRef)
    //                 })
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
}

export default new CategoryService()