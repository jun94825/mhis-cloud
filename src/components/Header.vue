<template>
  <el-row class="header" type="flex" align="middle" justify="space-between">
    <el-row class="left" type="flex" align="middle">
      <i class="el-icon-s-operation" @click="switchCollapse"></i>
      <img src="../assets/images/mhis-white.png" width="80" height="35" alt />
    </el-row>
    <el-row class="right" type="flex" align="middle">
      <img src="../assets/logo.png" width="30" height="30" alt />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ data.hosptialName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-d-arrow-left" @click.native="signOut">{{ $t('SignOut') }}</el-dropdown-item>
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
      const api = `http://${this.domain}.upis.info/Api/Login/Info`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.data = res.data.content;
        }
      });
    },
    signOut() {
      this.$router.push({ name: 'Login' });
    },
    switchCollapse() {
      this.$store.commit('COLLAPSE');
    },
  },
  created() {
    this.$store.commit('VERIFY');
    this.getInfo();
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/styles/helpers.scss";

.header {
  height: 4rem;
  background-color: $primary;

  .left > i {
    cursor: pointer;
    color: #fff;
    margin: 0 1.25rem;
    font-size: 1.25rem;
  }

  .right .el-dropdown-link {
    cursor: pointer;
    color: #fff;
    margin: 0 1.25rem;
  }
}
</style>
