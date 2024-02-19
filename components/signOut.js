import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';

export default function SignOut() {
    signOut(auth).then(() => {
        console.log('Signed Out');
    }).catch((error) => {
        console.error('Sign Out Error', error);
    });
}
