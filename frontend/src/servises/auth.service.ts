import {auth} from "@/firebase";

import {browserLocalPersistence, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithPopup, signOut} from "firebase/auth";
import firebase from "firebase/compat/app";
import type {User} from "@/stores/user";
import {useUserData} from "@/stores/user";
import router from "@/router";
// import UserCredential = firebase.auth.UserCredential;
// import User = firebase.auth.User;

//import {UserCredential, User} from '@firebase/auth/dist/auth-public';


const provider = new GoogleAuthProvider();



export const AuthService = {
    user: {
        displayName: '',
        email: '',
        uid: '',
        accessToken: '',
        avatarURL: '',
    } as User,
    //isUserAuthenticated: false,

    async isAuthenticated() {
        await auth.authStateReady()
        return  Boolean(auth.currentUser)

        // new Promise((rs) => {
        //     setTimeout(async () => {
        //         if () {
        //             rs(this.user.isAuthenticated)
        //         }
        //     }, 100)

        // })
    },

    signInWithGoogle() {
        signInWithPopup(auth, provider)
            .then((result: any) => {
                const {setUser} = useUserData()

                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user as any & { accessToken: string };
                // IdP data available using getAdditionalUserInfo(result)
                // ...

                this.user = {
                    displayName: user.displayName || '',
                    email: user.email || '',
                    uid: user.uid,
                    accessToken: user.accessToken,
                    avatarURL: user.photoURL || ''
                }

                console.log(this.user)

                setUser(this.user)

                return this.user
            }).catch((error: any) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        })
    },

    logout() {
        const {clearUser} = useUserData()

        clearUser()
        localStorage.clear()

        signOut(auth)

        router.push('/login')
    },

    setup() {
        onAuthStateChanged(auth, (retrievedUser: any) => {
            const {setUser, clearUser} = useUserData()

            if (retrievedUser) {
                console.log({retrievedUser})

                setUser({
                    displayName: retrievedUser.displayName || '',
                    email: retrievedUser.email || '',
                    uid: retrievedUser.uid,
                    accessToken: retrievedUser.accessToken,
                    avatarURL: retrievedUser.photoURL || ''
                })

                router.push('/')
            } else {
                console.log('user is not signed!')
                this.logout()
            }
        });

        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                //console.info('persistance is set')
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error({errorCode, errorMessage})
            });
    }
}

AuthService.setup()