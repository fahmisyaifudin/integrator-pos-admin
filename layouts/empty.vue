<template>
    <div>
        <Loader v-show="$store.state.general.isLoading"/>
        <div class="wrapper" :class="$store.state.general.isLoading && 'loader-wrapper'">
            <Nuxt />
        </div>
    </div>
</template>

<style>
    .loader-wrapper {
       opacity: 0.2;
    }
</style>