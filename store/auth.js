export const state = () => ({
    accessToken: null,
    refreshToken: null
})
    
export const mutations = {
    setToken(state, { accessToken, refreshToken}) {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
    }
}