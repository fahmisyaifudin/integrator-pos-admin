<template>
     <!-- Navbar -->
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl position-sticky blur shadow-blur mt-4 left-auto top-1" id="navbarBlur" navbar-scroll="true" style="z-index: 200;">
      <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Admin</a></li>
            <li class="breadcrumb-item text-sm text-dark active" aria-current="page">{{ $store.state.general.menuActive }}</li>
          </ol>
          <h6 class="font-weight-bolder mb-0">{{ $store.state.general.menuActive }}</h6>
        </nav>
        
        <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div class="ms-md-auto pe-md-3 d-flex align-items-center">
            
          </div>
          <MyProfile />
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
</template>

<script>
import MyProfile from "@@/components/Profile"
export default {
    components: {
        MyProfile
    }
}
</script>