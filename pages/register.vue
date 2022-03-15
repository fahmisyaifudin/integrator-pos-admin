<template>
<main class="main-content  mt-0">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-auto">
              <div class="card">
                <div class="card-header">
                  <h4 class="font-weight-bolder">Sign Up</h4>
                  <p class="mb-0">Enter your email and password to register</p>
                </div>
                <div class="card-body">
                  <form role="form">
                    <div class="input-group input-group-outline mb-3">
                      <input type="text" class="form-control" placeholder="Name" v-model="input.name">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <input type="email" class="form-control" placeholder="Email" v-model="input.email">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <input type="phone" class="form-control" placeholder="Phone" v-model="input.phone">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <input type="password" class="form-control" placeholder="Password" v-model="input.password">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <input type="password" class="form-control" placeholder="Repeat Password" v-model="input.repeat_password">
                    </div>
                    <div class="form-check form-check-info text-start ps-0">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="isChecked">
                      <label class="form-check-label" for="flexCheckDefault">
                        I agree the <a href="javascript:;" class="text-dark font-weight-bolder">Terms and Conditions</a>
                      </label>
                    </div>
                    <div class="text-center">
                      <button type="button" class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0" :disabled="!isChecked" @click="signUp()">Sign Up</button>
                    </div>
                  </form>
                </div>
                <div class="card-footer text-center pt-0 px-lg-2 px-1">
                  <p class="mb-2 text-sm mx-auto">
                    Already have an account?
                    <NuxtLink to="/login" class="text-primary text-gradient font-weight-bold">Sign in</NuxtLink>
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
export default {
    layout: 'empty',
    data(){
      return {
        isChecked: false,
        input: {
          name: '',
          email: '',
          password: '',
          repeat_password: ''
        }
      }
    },
    methods: {
      async signUp(){
        const response = await this.$axios.post('/register', this.input)
        if (response.status == 200) {
          this.$toast.success('Your account was registered, please login!', { duration: 3000})
          this.$router.push('login')
        }else if(response.status == 400){
           this.$toast.error(response.message, { duration: 3000})
        }

      }
    }
}
</script>