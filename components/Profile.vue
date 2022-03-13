<template>
    <ul class="navbar-nav  justify-content-end">            
        <li class="nav-item dropdown pe-2 d-flex align-items-center">
            <a href="javascript:;" class="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-user me-sm-1"></i>
            <span class="d-sm-inline d-none">{{ $store.state.profile.displayName }}</span>
            </a>
            <ul class="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
            <li class="mb-2">
                <a href="javascript:;" class="dropdown-item border-radius-md">
                <div class="py-1">
                    <div class="text-center">
                    <img src="/img/team-2.jpg" class="avatar avatar-lg  me-3 ">
                    </div>
                    <div class="d-flex flex-column justify-content-center my-2">
                    <h6 class="text-sm font-weight-normal mb-1 text-center">
                        <span class="font-weight-bold">{{ $store.state.profile.displayName }}</span>
                    </h6> 
                    <p class="text-xs text-center text-secondary mb-0">{{ $store.state.profile.email }}</p>
                    </div>
                </div>
                </a>
            </li>
            <li class="mb-2">
                <a class="dropdown-item border-radius-md d-flex justify-content-center" @click="signOut()">
                    <i class="fa fa-power-off mx-2 my-1"></i>
                    <h6 class="text-sm font-weight-normal mb-1 text-center">
                        <span class="font-weight-bold">Logout</span>
                    </h6>
                </a> 
            </li>
            </ul>
        </li>
    </ul>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
    methods: {
        signOut(){
             const auth = getAuth();
             signOut(auth).then(() => {
                 this.$router.push('login')
             })
        }
    }
}
</script>