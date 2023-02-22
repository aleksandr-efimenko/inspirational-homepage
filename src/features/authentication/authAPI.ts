import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/firebase";
import { FirebaseError } from "firebase/app";


export const authorize = async (email: string, password: string) => {
    const user = signInWithEmailAndPassword(auth, email, password)
        .then((userCredential ) => {
            // Signed in 
            return {email: userCredential.user.email, uid: userCredential.user.uid};
            // ...
        })
        .catch((error: FirebaseError) => {return error.code} );
    return user;
}
