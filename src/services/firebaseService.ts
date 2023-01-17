import {getFirestore, collection, getDocs, doc, getDoc} from "firebase/firestore"
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
}

export default new FirebaseService()