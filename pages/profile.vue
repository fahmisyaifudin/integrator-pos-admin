<template>
  <div></div>
</template>

<script>
export default {
    layout: 'admin',
    beforeCreate(){
      this.$store.commit('general/setMenu', 'Profile')
    }
}
</script>
