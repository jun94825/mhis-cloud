<template>
  <div class="h-100">
    <el-row class="header" type="flex" align="middle" justify="center">
      <img src="../assets/images/mhis-white.png" alt />
      <p>{{ info.hosptialName }}</p>
    </el-row>
    <el-row class="main" type="flex" align="middle" :style="{ backgroundImage: `url(${bgUrl})` }">
      <el-form
        ref="data"
        status-icon
        :model="data"
        :rules="rules"
        @keyup.enter.native="submitForm('data')"
      >
        <el-form-item class="mb-20">
          <el-select class="w-250" v-model="local" @change="changeLanguage">
            <el-option label="繁體中文" value="zh-tw"></el-option>
            <el-option label="English" value="en-us"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="mb-20" prop="userName">
          <el-input class="w-250" v-model="data.userName" :placeholder="$t('account')"></el-input>
        </el-form-item>
        <el-form-item class="mb-20" prop="password">
          <el-input
            class="w-250"
            v-model="data.password"
            :placeholder="$t('password')"
            type="password"
          ></el-input>
        </el-form-item>
        <el-row class="mb-20" type="flex" align="middle" justify="space-between">
          <el-form-item class="mb-0" prop="captcha">
            <el-input
              class="w-90"
              v-model="data.captcha"
              :placeholder="$t('captcha')"
              maxlength="4"
            ></el-input>
          </el-form-item>
          <img :src="captchaUrl" width="90" height="40" alt />
          <el-button class="mhis-primary" icon="el-icon-refresh" circle @click="getCaptcha"></el-button>
        </el-row>
        <el-row class="mb-20" type="flex">
          <el-checkbox v-model="data.remember">{{ $t('rememberMe') }}</el-checkbox>
        </el-row>
        <el-button class="w-250 mhis-primary" @click="submitForm('data')">{{ $t('login') }}</el-button>
      </el-form>
      <div class="img-area">
        <img
          width="150"
          height="150"
          v-for="(item, index) in info.logos"
          :key="index"
          :src="item.url"
          alt
        />
      </div>
    </el-row>
  </div>
</template>

<script>
import md5 from 'md5';

const localImg = require('../assets/images/login-bg.jpg');

export default {
  data() {
    const validateUserName = (rule, value, callback) => {
      const emptyMessage = this.language === 'tw' ? '請輸入帳號' : 'Enter a account';
      if (value === '') {
        callback(new Error(emptyMessage));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      const emptyMessage = this.language === 'tw' ? '請輸入密碼' : 'Enter a password';
      if (value === '') {
        callback(new Error(emptyMessage));
      } else {
        callback();
      }
    };
    const validateCaptcha = (rule, value, callback) => {
      const emptyMessage = this.language === 'tw' ? '請輸入驗證碼' : 'Enter a captcha';
      if (value === '') {
        callback(new Error(emptyMessage));
      } else {
        callback();
      }
    };
    return {
      data: {
        key: '',
        captcha: '',
        userName: '',
        password: '',
        remember: false,
      },
      info: {},
      bgUrl: '',
      local: 'zh-tw',
      captchaUrl: '',
      rules: {
        userName: [
          { required: true, trigger: 'blur', validator: validateUserName },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword },
        ],
        captcha: [
          { required: true, trigger: 'blur', validator: validateCaptcha },
        ],
      },
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
    language() {
      return this.$store.state.language;
    },
  },
  methods: {
    randomNumber() {
      const list = [];
      for (let i = 0; i < 8; i += 1) {
        list.push(Math.floor(Math.random() * 10));
      }
      const randomResult = list.join('');
      this.data.key = randomResult;
      return randomResult;
    },
    getCaptcha() {
      const api = `http://${this.domain}.upis.info/Api/Captcha/${this.randomNumber()}`;
      this.$http.get(api).then((res) => {
        this.captchaUrl = res.config.url;
      });
    },
    getLanguage() {
      const lsLanguage = localStorage.getItem('language');
      const language = lsLanguage === null || lsLanguage === 'tw' ? 'tw' : 'us';
      if (language === 'tw') {
        this.local = 'zh-tw';
      } else {
        this.local = 'en-us';
      }
      this.$store.commit('LANGUAGE', language);
    },
    changeLanguage() {
      this.$store.commit('LANGUAGE', this.local.substr(3, 2));
      localStorage.setItem('language', this.local.substr(3, 2));
      // this.submitForm('data'); // 會觸發驗證 ...
    },
    login() {
      const api = `http://${this.domain}.upis.info/Api/Login`;
      this.data.password = md5(this.data.password);
      const dataJS = JSON.stringify(this.data);
      this.$store.commit('LOADING', true);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success) {
          localStorage.setItem('cookie', res.data.content.access_token);
          localStorage.setItem('menuGrp', JSON.stringify(res.data.content.info.menu.menuGrp));
          this.$store.commit('LOADING', false);
          this.$router.push({ name: 'Home' });
        } else {
          this.$store.commit('LOADING', false);
          this.$refs.data.resetFields();
          this.getCaptcha();
          this.$message({ type: 'error', center: true, message: '帳號或密碼錯誤' });
        }
      });
    },
    getInfo() {
      const api = `http://${this.domain}.upis.info/Api/Login/Info`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.info = res.data.content;
          if (res.data.content.bg === null) {
            this.bgUrl = localImg;
          } else {
            this.bgUrl = res.data.content.bg.url;
          }
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
  },
  created() {
    this.$store.commit('VERIFY');
    this.getLanguage();
    this.getCaptcha();
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/views/login.scss";
</style>
