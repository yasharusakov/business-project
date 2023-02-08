import {collection, doc, getFirestore, onSnapshot, orderBy, OrderByDirection, query} from "firebase/firestore";

class ListenService {
    listenDocs(setData: {(data: any): void}, path: string, orderByValue: OrderByDirection) {
        try {
            const db = getFirestore()
            const collectionRef = collection(db, path)
            const q = query(collectionRef, orderBy('timestamp', orderByValue))
            return onSnapshot(q, (querySnapshot) => {
                setData(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
            })
        } catch (err) {
            console.log(err)
        }
    }

    listenDoc(setData: {(data: any): void}, path: string) {
        try {
            const db = getFirestore()
            const docRef = doc(db, path)
            return onSnapshot(docRef, querySnapshot => {
                setData(querySnapshot.data())
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export default new ListenService()