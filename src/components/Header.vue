<template>
  <el-row type="flex" align="middle" justify="space-between" class="header">
    <el-row type="flex" align="middle" class="left">
      <i class="el-icon-s-operation" @click="switchCollapse"></i>
      <img src="../assets/images/mhis-white.png" width="80" height="35" alt>
    </el-row>
    <el-row type="flex" align="middle" class="right">
      <img src="../assets/logo.png" width="30" height="30" alt>
      <el-dropdown>
        <span class="el-dropdown-link">
          Jun
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-d-arrow-left" @click.native="signOut">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </el-row>
</template>

<script>
export default {
  methods: {
    switchCollapse() {
      this.$store.commit('SWITCH_COLLAPSE');
    },
    signOut() {
      this.$router.push({ name: '登入' });
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/styles/components/header.scss";
</style>
