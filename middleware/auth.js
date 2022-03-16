import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ({ redirect, store, app, $axios }) {
        store.commit('general/setLoading', true)
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            store.commit('general/setLoading', false)
            if (user) {
                store.commit('auth/setToken', { 
                    accessToken: user.accessToken, 
                    refreshToken: user.refreshToken
                });
                store.commit('profile/setProfile', { 
                    email: user.email,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified,
                    phoneNumber: user.phoneNumber,
                    uid: user.uid
                });
            } else {
                return redirect('/login')
            }
        });
}