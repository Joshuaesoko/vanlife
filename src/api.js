import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, getDoc, query,
    where } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyCRSB3EPtrkygEZJTTQYu4g-_rqdb7beI4",
  authDomain: "vanlife-1102d.firebaseapp.com",
  projectId: "vanlife-1102d",
  storageBucket: "vanlife-1102d.appspot.com",
  messagingSenderId: "503547008837",
  appId: "1:503547008837:web:6d44cb7fdd6fd9c79c502c"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const vansCollectionRef = collection(db, "Vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "Vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}


export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}