import { db, auth } from '../firebaseConfig';
import { collection, addDoc, where, query, getDocs, getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const handleItemType = (item) => {
    return item.type.toLowerCase();
};

const getUser = async () => {
    const user = auth.currentUser;
    try {
        const users = collection(db, 'users');
        const q = query(users, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        let userId = null;

        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
            userId = doc.id;
        });

        return userId;
    } catch (e) {
        console.error(e);
    }
}

const getUserPortfolioID = async () => {
    try {
        const users = collection(db, 'users');
        const user = await getUser(); // Use await to get the user ID
        const userDoc = await getDoc(doc(users, user));

        if (userDoc.exists()) {
            const portfolioCollection = collection(users, user, 'portfolio');
            const portfolioQuery = await getDocs(portfolioCollection);

            let portfolioId = null;

            portfolioQuery.forEach((portfolioDoc) => {
                console.log("Document data:", portfolioDoc.id);
                portfolioId = portfolioDoc.id;
            });

            return portfolioId;
        } else {
            console.log("No such document!");
            return null;
        }

    } catch (e) {
        console.error(e);
    }
}

const addToPortfolio = async (item) => {
    const uid = await getUser(); // Use await to get the user ID
    const type = handleItemType(item);
    const portfolioID = await getUserPortfolioID(); // Use await to get the portfolio ID

    if (portfolioID) {
        const portfolioDocRef = doc(db, `users/${uid}/portfolio/${portfolioID}`);
        await updateDoc(portfolioDocRef, {
            [type]: arrayUnion(item.label)
        });
    } else {
        console.log("Portfolio ID not found.");
    }
}

export const FirestoreData = async ({ item }) => {
    console.log("Item:", item);
    const userId = await getUser();
    await getUserPortfolioID();
    await addToPortfolio(item);
};
