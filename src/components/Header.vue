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
          {{ data.hosptialName}}
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
  data() {
    return {
      data: {},
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getInfo() {
      const api = 'http://jun.upis.info/Api/Login/Info';
      this.$http.get(api).then((res) => {
        this.data = res.data.content;
      });
    },
    switchCollapse() {
      this.$store.commit('COLLAPSE');
    },
    signOut() {
      this.$router.push({ name: 'Login' });
    },
  },
  created() {
    const token = localStorage.getItem('cookie');
    this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.$store.commit('DOMAIN');
    this.getInfo();
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/styles/components/header.scss";
</style>
