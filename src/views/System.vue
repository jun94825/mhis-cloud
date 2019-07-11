<template>
  <div>
    <Header />
    <el-row type="flex">
      <div class="sidebar">
        <Sidebar />
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
.sidebar {
  min-height: calc(100vh - 4rem);
  background-color: #333;
}

.main {
  width: 100%;
  min-width: calc(100% - 200px);
  max-width: calc(100% - 64px);
  background-color: #f5f5f5;
}
</style>
