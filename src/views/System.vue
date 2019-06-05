<template>
  <div>
    <Header/>
    <el-row type="flex">
      <div class="sidebar">
        <Sidebar/>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </el-row>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';

export default {
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/views/system.scss";
</style>
