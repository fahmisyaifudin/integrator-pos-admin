export const state = () => ({
    isLoading: false,
    menuActive: false,
})
    
export const mutations = {
    setLoading(state, data) {
        state.isLoading = data;
    },
    setMenu(state, data) {
        state.menuActive = data;
    }
}