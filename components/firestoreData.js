import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const FirestoreData = ({ item }) => {
    console.log("Item:", item);
};

