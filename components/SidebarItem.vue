<template>
    <ul class="navbar-nav">
    <li class="nav-item">
        <a class="nav-link text-white" :class="{'active bg-gradient-primary': isActive }" href="#">
        <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="material-icons opacity-10">{{ icon }}</i>
        </div>
        <span class="nav-link-text ms-1">{{ name }}</span>
        </a>
    </li>
    </ul>
</template>

<script>
export default {
    props: ['name', 'icon', 'isActive']
}
</script>