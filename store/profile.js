export const state = () => ({
    email: '',
    displayName: '',
    emailVerified: false,
    phoneNumber: '',
    uid: ''
})
    
export const mutations = {
    setProfile(state, { email, emailVerified, displayName, phoneNumber, uid}) {
        state.email= email
        state.displayName = displayName
        state.emailVerified = emailVerified
        state.phoneNumber = phoneNumber
        state.uid = uid
    }
}