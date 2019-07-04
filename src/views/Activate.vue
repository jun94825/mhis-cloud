<template>
  <el-row type="flex" align="middle" justify="center" class="reg-bg">
    <img src="../assets/images/advmeds-long.png" alt class="advmeds-logo" />
    <el-col :xl="6" :lg="8" :md="10" :sm="14" :xs="22" class="form-bg">
      <el-row type="flex" align="middle" justify="center" class="success-info">
        <img src="../assets/images/mhis-blue.png" alt />
        <p>註冊</p>
        <i :class="icon"></i>
        <p>{{ mes1 }}</p>
        <p>{{ mes2 }}</p>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { setInterval, setTimeout, clearInterval } from 'timers';

export default {
  data() {
    return {
      mes1: '驗證成功',
      mes2: '目前正在創建資料庫，請勿離開！',
      icon: 'el-icon-warning warning',
    };
  },
  methods: {
    redirect() {
      const api = 'http://005.upis.info/Api/Created';
      this.$http.get(api).then((res) => {
        console.log('Created');
        console.log(res.data.status);
        if (res.data.status === 0) {
          this.mes1 = '創建成功';
          this.mes2 = '3 秒後將自動導航至登入頁 ...';
          this.icon = 'el-icon-success success';
          setTimeout(() => {
            this.$store.commit('LOADING', false);
            this.$router.push({ name: 'Login' });
          }, 3000);
        }
      });
    },
  },
  created() {
    this.$store.commit('LOADING', true);
    const api = 'http://005.upis.info/Api/Activation';
    this.$http.get(api).then((res) => {
      console.log('Activation');
      console.log(res);
    });
  },
  mounted() {
    const x = setInterval(this.redirect, 3000);
    this.$once('hook:beforeDestroy', () => {
      clearInterval(x);
    });
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/styles/views/success.scss";
</style>
