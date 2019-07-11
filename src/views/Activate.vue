<template>
  <el-row
    type="flex"
    align="middle"
    justify="center"
    class="reg-bg"
    v-loading="loading"
    element-loading-text="稍待片刻 ..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.75)"
  >
    <img src="../assets/images/advmeds-long.png" alt class="advmeds-logo" />
    <el-col :xl="6" :lg="8" :md="10" :sm="14" :xs="22" class="form-bg">
      <el-row type="flex" align="middle" justify="center" class="success-info">
        <img src="../assets/images/mhis-blue.png" alt />
        <p>註冊</p>
        <i :class="icon"></i>
        <p>{{ mes1 }}</p>
        <p>{{ mes2 }}</p>
        <div v-if="status" class="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { setInterval, setTimeout, clearInterval } from 'timers';

export default {
  data() {
    return {
      mes1: '驗證中',
      mes2: '正在進行驗證比對，請稍後 ...',
      icon: 'el-icon-warning warning',
      status: true,
      loading: false,
      interval: null,
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    redirect() {
      this.mes1 = '創建中';
      this.mes2 = '正在創建資料庫，請勿離開！';
      const api = `http://${this.domain}.upis.info/Api/Created`;
      this.$http.get(api).then((res) => {
        console.log('Created');
        console.log(res);
        if (res.data.status === 0) {
          clearInterval(this.interval);
          this.mes1 = '創建成功';
          this.mes2 = '５秒後將自動導航至登入頁 ...';
          this.icon = 'el-icon-success success';
          this.status = false;
          this.loading = true;
          setTimeout(() => {
            this.$store.commit('LOADING', false);
            this.$router.push({ name: 'Login' });
          }, 5000);
        }
      });
    },
  },
  created() {
    this.$store.commit('VERIFY');
    const api = `http://${this.domain}.upis.info/Api/Activation`;
    this.$http.get(api).then((res) => {
      console.log(res);
      if (res.data.success) {
        console.log('Activation');
        console.log(res);
        this.redirect();
      } else {
        alert('Error!');
      }
    });
  },
  mounted() {
    this.interval = setInterval(this.redirect, 5000);
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/styles/views/success.scss";

@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
}

.bouncing-loader {
  display: flex;
  justify-content: center;
}

.bouncing-loader > div {
  width: 1rem;
  height: 1rem;
  margin: 3rem 0.2rem;
  background: #e6a23c;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}

.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}

.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
