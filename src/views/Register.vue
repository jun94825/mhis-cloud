<template>
  <el-row type="flex" align="middle" justify="center" class="reg-bg">
    <img src="../assets/images/advmeds-long.png" alt class="advmeds-logo">
    <el-col :xl="6" :lg="8" :md="10" :sm="14" :xs="22" class="form-bg">
      <el-row type="flex" align="middle" justify="center" class="form-header">
        <img src="../assets/images/mhis-blue.png" alt>
        <p>{{ $t('Register') }}</p>
      </el-row>
      <el-row type="flex" align="middle" justify="center">
        <el-form ref="data" :model="data" :rules="rules" @keyup.enter.native="submitForm('data')">
          <el-form-item :label="$t('Language')" class="mb-8">
            <el-select v-model="data.local" class="w-250" @change="changeLanguage">
              <el-option label="繁體中文" value="zh-tw"></el-option>
              <el-option label="English" value="en-us"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('TimeZone')" class="mb-8">
            <el-select v-model="data.timeZone" class="w-250">
              <el-option label="GMT+6" value="6"></el-option>
              <el-option label="GMT+7" value="7"></el-option>
              <el-option label="GMT+8" value="8"></el-option>
              <el-option label="GMT+9" value="9"></el-option>
              <el-option label="GMT+10" value="10"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('HospitalNo')" class="mb-8" prop="hospitalNo">
            <el-input v-model="data.hospitalNo" maxlength="20" class="w-250"></el-input>
          </el-form-item>
          <el-form-item :label="$t('HospitalName')" class="mb-8" prop="hospitalName">
            <el-input v-model="data.hospitalName" maxlength="200" class="w-250"></el-input>
          </el-form-item>
          <el-form-item :label="$t('Email')" class="mb-8" prop="email">
            <el-input v-model="data.email" class="w-250"></el-input>
          </el-form-item>
          <el-form-item :label="$t('ContactPerson')" class="mb-8" prop="contactPerson">
            <el-input v-model="data.contactPerson" maxlength="20" class="w-250"></el-input>
          </el-form-item>
          <el-row type="flex" align="middle" justify="space-between" class="mb-8">
            <el-form-item :label="$t('Captcha')" class="mb-0" prop="captcha">
              <el-input v-model="data.captcha" maxlength="4" class="w-90"></el-input>
            </el-form-item>
            <img :src="captchaUrl" class="mt-40" width="90" height="40" alt>
            <el-button
              circle
              type="primary"
              icon="el-icon-refresh-right"
              class="mt-40"
              @click="getCaptcha"
            ></el-button>
          </el-row>
          <el-button
            type="primary"
            class="w-250 mt-16"
            @click="submitForm('data')"
          >{{ $t('Register') }}</el-button>
        </el-form>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    const validateHospitalNo = (rule, value, callback) => {
      const emptyMessage = this.language === 'tw' ? '請輸入醫院編號' : 'Enter a hospital number';
      const reg = new RegExp(/^[a-zA-Z0-9]{0,20}$/);
      if (value === '') {
        callback(new Error(emptyMessage));
      } else if (value.search(reg) === -1) {
        callback('不得有特殊符號');
      } else {
        callback();
      }
    };
    const validateHospitalName = (rule, value, callback) => {
      const emptyMessage = this.language === 'tw' ? '請輸入醫院名稱' : 'Enter a hospital name';
      const reg = new RegExp(/^[\u4e00-\u9fa5a-zA-Z0-9]{0,200}$/);
      if (value === '') {
        callback(new Error(emptyMessage));
      } else if (value.search(reg) === -1) {
        callback('不得有特殊符號');
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      const emptyMessage = this.language === 'tw' ? '請輸入電子郵件' : 'Enter a Email';
      const reg = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
      if (value === '') {
        callback(new Error(emptyMessage));
      } else if (value.search(reg) === -1) {
        callback('格式有誤');
      } else {
        callback();
      }
    };
    const validateContactPerson = (rule, value, callback) => {
      const emptyMessage = this.language === 'tw' ? '請輸入聯絡人' : 'Enter a Contact Person';
      const reg = new RegExp(/^[\u4e00-\u9fa5a-zA-Z0-9\s]{1,20}$/);
      if (value === '') {
        callback(new Error(emptyMessage));
      } else if (value.search(reg) === -1) {
        callback('不得有特殊符號');
      } else {
        callback();
      }
    };
    const validateCaptcha = (rule, value, callback) => {
      const emptyMessage = this.language === 'tw' ? '請輸入驗證碼' : 'Enter a Captcha';
      if (value === '') {
        callback(new Error(emptyMessage));
      } else {
        callback();
      }
    };
    return {
      data: {
        local: 'zh-tw',
        timeZone: '8',
        hospitalNo: '',
        hospitalName: '',
        email: '',
        contactPerson: '',
        captcha: '',
        key: '',
      },
      rules: {
        hospitalNo: [
          { required: true, trigger: 'blur', validator: validateHospitalNo },
        ],
        hospitalName: [
          { required: true, trigger: 'blur', validator: validateHospitalName },
        ],
        email: [
          { required: true, trigger: 'blur', validator: validateEmail },
        ],
        contactPerson: [
          { required: true, trigger: 'blur', validator: validateContactPerson },
        ],
        captcha: [
          { required: true, trigger: 'blur', validator: validateCaptcha },
        ],
      },
      captchaUrl: '',
    };
  },
  computed: {
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
      const api = `http://advmeds.upis.info/Api/Captcha/${this.randomNumber()}`;
      this.$http.get(api).then((res) => {
        this.captchaUrl = res.config.url;
      });
    },
    getLanguage() {
      const lsLanguage = localStorage.getItem('language');
      const language = lsLanguage === null || lsLanguage === 'tw' ? 'tw' : 'us';
      if (language === 'tw') {
        this.data.local = 'zh-tw';
      } else {
        this.data.local = 'en-us';
      }
      this.$store.commit('LANGUAGE', language);
    },
    changeLanguage() {
      this.$store.commit('LANGUAGE', this.data.local.substr(3, 2));
      localStorage.setItem('language', this.data.local.substr(3, 2));
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register();
        } else {
          return false;
        }
      });
    },
    register() {
      const api = 'http://advmeds.upis.info/Api/Registration';
      this.data.timeZone = Number(this.data.timeZone);
      const dataJS = JSON.stringify(this.data);
      this.$store.commit('LOADING', true);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success === true) {
          this.$store.commit('LOADING', false);
          this.$router.push({ name: '註冊成功', query: { key: `${this.randomNumber()}` } });
        } else {
          this.$store.commit('LOADING', false);
          this.$message({
            type: 'error',
            center: true,
            message: '註冊失敗',
          });
        }
      });
    },
  },
  created() {
    this.getLanguage();
    this.getCaptcha();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/views/register.scss";
</style>
