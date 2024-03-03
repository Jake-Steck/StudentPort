import { db, auth } from '../firebaseConfig';
import { collection, addDoc, where, query, getDocs, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

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

const addToPortfolio = async (item, type) => {
    const uid = await getUser(); // Use await to get the user ID
    // const type = handleItemType(item);
    const portfolioID = await getUserPortfolioID(); // Use await to get the portfolio ID

    if (portfolioID) {
        const portfolioDocRef = doc(db, `users/${uid}/portfolio/${portfolioID}`);
        await updateDoc(portfolioDocRef, {
            [type]: arrayUnion(item)
        });
    } else {
        console.log("Portfolio ID not found.");
    }
}

const removeFromPortfolio = async (item, type) => {
    const uid = await getUser(); // Use await to get the user ID
    const portfolioID = await getUserPortfolioID(); // Use await to get the portfolio ID

    if (portfolioID) {
        const portfolioDocRef = doc(db, `users/${uid}/portfolio/${portfolioID}`);
        await updateDoc(portfolioDocRef, {
            [type]: arrayRemove(item)
        });
    } else {
        console.log("Portfolio ID not found.");
    }
}

const getClasses = async (userId) => {
    try {
        const portfolioID = await getUserPortfolioID(userId);
        const portfolioDoc = await getDoc(doc(db, `users/${userId}/portfolio/${portfolioID}`));

        if (portfolioDoc.exists()) {
            const portfolioData = portfolioDoc.data();
            const classes = portfolioData ? portfolioData.classes || [] : [];
            return classes;
        } else {
            console.log("No portfolio document found!");
            return [];
        }
    } catch (e) {
        console.error("Error fetching classes:", e);
        return [];
    }
}

const getSports = async (userId) => {
    try {
        const portfolioID = await getUserPortfolioID(userId);
        const portfolioDoc = await getDoc(doc(db, `users/${userId}/portfolio/${portfolioID}`));

        if (portfolioDoc.exists()) {
            const portfolioData = portfolioDoc.data();
            const sports = portfolioData ? portfolioData.athletics || [] : [];
            return sports;
        } else {
            console.log("No portfolio document found!");
            return [];
        }
    } catch (e) {
        console.error("Error fetching sports:", e);
        return [];
    }
}

const getClubs = async (userId) => {
    try {
        const portfolioID = await getUserPortfolioID(userId);
        const portfolioDoc = await getDoc(doc(db, `users/${userId}/portfolio/${portfolioID}`));

        if (portfolioDoc.exists()) {
            const portfolioData = portfolioDoc.data();
            const clubs = portfolioData ? portfolioData.clubs || [] : [];
            return clubs;
        } else {
            console.log("No portfolio document found!");
            return [];
        }
    } catch (e) {
        console.error("Error fetching clubs:", e);
        return [];
    }
}

const getService = async (userId) => {
    try {
        const portfolioID = await getUserPortfolioID(userId);
        const portfolioDoc = await getDoc(doc(db, `users/${userId}/portfolio/${portfolioID}`));

        if (portfolioDoc.exists()) {
            const portfolioData = portfolioDoc.data();
            const service = portfolioData ? portfolioData.service || [] : [];
            return service;
        } else {
            console.log("No portfolio document found!");
            return [];
        }
    } catch (e) {
        console.error("Error fetching service:", e);
        return [];
    }
}

const getOther = async (userId) => {
    try {
        const portfolioID = await getUserPortfolioID(userId);
        const portfolioDoc = await getDoc(doc(db, `users/${userId}/portfolio/${portfolioID}`));

        if (portfolioDoc.exists()) {
            const portfolioData = portfolioDoc.data();
            const other = portfolioData ? portfolioData.other || [] : [];
            return other;
        } else {
            console.log("No portfolio document found!");
            return [];
        }
    } catch (e) {
        console.error("Error fetching other:", e);
        return [];
    }
}

export { getUser, getUserPortfolioID, addToPortfolio, getClasses, getSports, removeFromPortfolio, getClubs, getService, getOther };
