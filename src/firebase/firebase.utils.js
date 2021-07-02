import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAjOQSbHz2MqAhwRNVI045Jm9kzvvsiXY0",
    authDomain: "crwn-db-acbcd.firebaseapp.com",
    projectId: "crwn-db-acbcd",
    storageBucket: "crwn-db-acbcd.appspot.com",
    messagingSenderId: "550158845762",
    appId: "1:550158845762:web:c919e4ce3acc3698f36adb"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()

    if (!snapshot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                createdAt,
                email,
                ...additionalData
            })
        } catch (e) {
            console.log('error creating user', e)
        }
    }

    return userRef
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;