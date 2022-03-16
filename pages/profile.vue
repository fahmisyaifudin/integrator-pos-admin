<template>
  <div class="row">
    <div class="card">
       <div class="col-md-12">
          <div class="card-header  pb-0 p-3">
            <div class="row">
              <div class="col-6 d-flex align-items-center">
                  <h6 class="mb-0">Fahmi Syaifudin</h6>
              </div>
              <div class="col-6 d-flex justify-content-end">
                <button class="btn btn-warning" @click="resetPassword">Reset Password</button>
              </div>
            </div>
            <div class="row">
              <div class="alert alert-light" role="alert">
               <b>Auth Token : </b> {{ $store.state.profile.uid }}
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
                <div class="col-6">
                  <label>Shop Name</label>
                  <div class="input-group input-group-outline mb-3">
                    <input type="text" v-model="input.name" class="form-control">
                  </div>
                </div>
                <div class="col-6">
                  <label>Address</label>
                  <div class="input-group input-group-outline mb-3">
                    <input type="text" v-model="input.address"  class="form-control">
                  </div>
                </div>
            </div>
             <div class="row">
                <div class="col-6">
                  <label>Email</label>
                  <div class="input-group input-group-outline mb-3">
                    <input type="text" :value="$store.state.profile.email" class="form-control" disabled>
                  </div>
                </div>
                <div class="col-6">
                  <label>Phone</label>
                  <div class="input-group input-group-outline mb-3">
                    <input type="text" :value="$store.state.profile.phoneNumber" class="form-control" disabled>
                  </div>
                </div>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-success" @click="updateProfile">Update</button>
          </div>
       </div>
    </div>
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default {
    layout: 'admin',
    beforeCreate(){
      this.$store.commit('general/setMenu', 'Profile')
      this.$axios.setToken(this.$store.state.auth.accessToken, 'Bearer')
    },
    data(){
      return {
        input: {
          name: '',
          address: '',
          logo: null
        }
      }
    },
    created(){
      this.$axios.get('/api/profile').then(res => {
        console.log(res.data);
          this.input.name = res.data.data.name
          this.input.address = res.data.data.address
      })
    },
    methods: {
      resetPassword(){
        this.$store.commit('general/setLoading', true)
        const auth = getAuth();
        sendPasswordResetEmail(auth, this.$store.state.profile.email)
          .then(() => {
            this.$store.commit('general/setLoading', false)
            this.$toast.success("Password reset link sent, Please check your email", { duration: 3000 })
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      },
      updateProfile(){
        this.$axios.put('/api/profile', this.input).then(res => {
          if (res.status == 200) {
            this.$toast.success("Success, data updated", { duration: 3000 })
          }
        })
      }
    }
}
</script>
