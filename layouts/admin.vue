<template>
  <div>
    <Loader v-show="$store.state.general.isLoading"/>
    <div class="wrapper" :class="$store.state.general.isLoading && 'loader-wrapper'">
      <MySidebar />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <MyNavbar />
        <div class="container-fluid py-4">
          <Nuxt />
            <!-- <div class="row"> 
              <div class="col-md-12">
                  <div class="card">
                      <div class="card-header pb-0 p-3">
                      <div class="row">
                          <div class="col-6 d-flex align-items-center">
                          <h6 class="mb-0">{{ $store.state.general.menuActive }}</h6>
                          </div>
                      </div>
                      </div>
                      <div class="card-body p-3">    
                          <Nuxt />
                      </div>
                  </div>
                  </div>
              </div> -->
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import MyNavbar from "@@/components/Navbar";
import Loader from "@@/components/Loader";
import MySidebar from "@@/components/Sidebar";
export default {
  middleware: 'auth',
  components: {
    MyNavbar,
    MySidebar,
    Loader
  },
  
}
</script>

<style>
    .loader-wrapper {
       opacity: 0.2;
    }
</style>
