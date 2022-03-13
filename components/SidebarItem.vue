<template>
    <ul class="navbar-nav">
    <li class="nav-item">
        <NuxtLink :to="link" class="nav-link text-white" :class="{'active bg-gradient-primary': isActive }">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">{{ icon }}</i>
            </div>
            <span class="nav-link-text ms-1">{{ name }}</span>
        </NuxtLink>
    </li>
    </ul>
</template>

<script>
export default {
    props: ['name', 'icon', 'link'],
    computed: {
        isActive(){
            return this.$store.state.general.menuActive === this.name
        }
    }
}
</script>