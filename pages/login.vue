<template>
<main class="main-content  mt-0">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-auto">
              <div class="card">
                <div class="card-header">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Sign in for continue</p>
                </div>
                <div class="card-body">
                  <form role="form">
                    <div class="input-group input-group-outline mb-3">
                      <input type="email" placeholder="Email" v-model="input.email" class="form-control">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <input type="password" placeholder="Password" v-model="input.password" class="form-control">
                    </div>
                    <div class="form-check form-check-info text-start ps-0">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked>
                      <label class="form-check-label" for="flexCheckDefault">
                       Remember me
                      </label>
                    </div>
                    <div class="text-center">
                      <button type="button" :class="{ 'disabled': $store.state.general.isLoading }" class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0" @click="signIn()">Sign In</button>
                    </div>
                  </form>
                </div>
                <div class="card-footer text-center pt-0 px-lg-2 px-1">
                  <p class="mb-2 text-sm mx-auto">
                    Don't have account?
                    <NuxtLink to="/register" class="text-primary text-gradient font-weight-bold">Sign up</NuxtLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
    layout: 'empty',
    components: {
      
    },
    data(){
      return {
        input: {}
      }
    },
    mounted(){
        // const bodyElement = document.querySelector('body');
        // bodyElement.classList.remove('bg-gray-200');
    },
    methods: {
      signIn(){
        this.$store.commit('general/setLoading', true);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.input.email, this.input.password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            this.$toast.success("Login Success", { duration: 3000 })
            this.$store.commit('auth/setToken', { 
              accessToken: user.accessToken, 
              refreshToken: user.refreshToken
            });
            this.$store.commit('profile/setProfile', { 
                email: user.email,
                displayName: user.displayName,
                emailVerified: user.emailVerified,
                phoneNumber: user.phoneNumber,
                uid: user.uid
            });
            this.$store.commit('general/setLoading', false);
            window.location.href = "/"
            // ...
          })
          .catch((error) => {
             this.$store.commit('general/setLoading', false);
             this.$toast.error(error.message, { duration: 3000 })
          });
      }
    }
}
</script>

<style scoped>

input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; } /* Firefox 18- */
input:focus::-moz-placeholder { color:transparent; } /* Firefox 19+ */
input:focus:-ms-input-placeholder { color:transparent; } /* oldIE ;) */
</style>