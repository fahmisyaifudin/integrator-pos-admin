export default function ({ $axios, redirect, store, $toast }) {
    if (store.state.auth.accessToken) {
        this.$axios.setToken(store.state.auth.accessToken, 'Bearer')
    }

    $axios.onRequest(config => {
        store.commit('general/setLoading', true)
    })

    $axios.onResponse(response => {
        store.commit('general/setLoading', false)
    })
  
    $axios.onError(error => {
      store.commit('general/setLoading', false)
      const code = parseInt(error.response && error.response.status)
      if (code == 500) {
        $toast.error('Oops...Something went wrong, Please contact admin', {
            duration: 3000,
            action: {
                text: 'Cancel',
                onClick: (e, toastObject) => {
                    toastObject.goAway(0)
                }
            }
        })
      }
    })
}