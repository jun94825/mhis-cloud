<template>
  <div
    id="app"
    v-loading="loading"
    element-loading-text="拚了命加載中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.75)"
  >
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    loading() { return this.$store.state.loading; },
  },
};
</script>


<style lang="scss">
@import "assets/styles/app.scss";
</style>
