import {getFirestore, collection, getDocs, doc, getDoc, updateDoc, deleteDoc, setDoc, serverTimestamp, onSnapshot, query, orderBy, OrderByDirection, where, limit, startAfter} from "firebase/firestore"
import {uploadBytes, getDownloadURL, ref, getStorage, deleteObject, listAll} from 'firebase/storage'

class FirebaseService {
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
}

export default new FirebaseService()