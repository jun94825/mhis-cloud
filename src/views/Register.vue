<template>
  <el-row type="flex" align="middle" justify="center" class="reg-bg">
    <img src="../assets/images/advmeds-long.png" alt class="advmeds-logo">
    <el-col :xl="6" :lg="8" :md="10" :sm="14" :xs="22" class="form-bg">
      <el-row type="flex" align="middle" justify="center" class="form-header">
        <img src="../assets/images/mhis-blue.png" alt>
        <p>註冊</p>
      </el-row>
      <el-row type="flex" align="middle" justify="center">
        <el-form :model="data" :rules="rules" ref="data" status-icon>
          <el-form-item label="語言" class="mb-8">
            <el-select v-model="data.local" placeholder="請選擇語言" class="w-250">
              <el-option label="繁體中文" value="zh-tw"></el-option>
              <el-option label="English" value="en-us"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="時區" class="mb-8">
            <el-select v-model="data.timeZone" placeholder="請選擇時區" class="w-250">
              <el-option label="GMT+5" value="5"></el-option>
              <el-option label="GMT+6" value="6"></el-option>
              <el-option label="GMT+7" value="7"></el-option>
              <el-option label="GMT+8" value="8"></el-option>
              <el-option label="GMT+9" value="9"></el-option>
              <el-option label="GMT+10" value="10"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('HospitalNo')" class="mb-8" prop="hospitalNo">
            <el-input v-model="data.hospitalNo" class="w-250"></el-input>
          </el-form-item>
          <el-form-item label="醫院名稱" class="mb-8" prop="hospitalName">
            <el-input v-model="data.hospitalName" class="w-250"></el-input>
          </el-form-item>
          <el-form-item label="電子郵件" class="mb-8" prop="email">
            <el-input v-model="data.email" class="w-250"></el-input>
          </el-form-item>
          <el-form-item label="聯絡人" class="mb-8" prop="contactPerson">
            <el-input v-model="data.contactPerson" class="w-250"></el-input>
          </el-form-item>
          <el-row type="flex" align="middle" justify="space-between" class="mb-8">
            <el-form-item label="驗證碼" class="mb-0" prop="captcha">
              <el-input v-model="data.captcha" maxlength="4" class="w-80"></el-input>
            </el-form-item>
            <img src="../assets/images/captcha.png" alt class="mt-40">
            <el-button type="primary" icon="el-icon-refresh" circle class="mt-40"></el-button>
          </el-row>
          <el-button type="primary" class="w-250 mt-16" @click="submitForm('data')">註冊</el-button>
        </el-form>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    const validateHospitalNo = (rule, value, callback) => {
      const errorMessage = this.lang === 'tw' ? '請輸入醫院編號' : 'Please Input the Hospital Number';
      if (value === '') {
        callback(new Error(errorMessage));
      } else if (this.data.hospitalNo !== '') {
        callback();
      }
      // else {
      //   if (this.data.hospitalNo !== '') {
      //     this.$refs.data.validateField('checkPass');
      //   }
      //   callback();
      // }
    };
    const validateHospitalName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入醫院名稱'));
      } else if (this.data.hospitalName !== '') {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入電子郵件'));
      } else if (this.data.email !== '') {
        callback();
      }
    };
    const validateContactPerson = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入聯絡人'));
      } else if (this.data.contactPerson !== '') {
        callback();
      }
    };
    const validateCaptcha = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入驗證碼'));
      } else if (this.data.captcha !== '') {
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
      captchaUrl: '',
      rules: {
        hospitalNo: [
          { validator: validateHospitalNo, trigger: 'blur' },
        ],
        hospitalName: [
          { validator: validateHospitalName, trigger: 'blur' },
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' },
        ],
        contactPerson: [
          { validator: validateContactPerson, trigger: 'blur' },
        ],
        captcha: [
          { validator: validateCaptcha, trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    lang() { return this.$store.state.lang; },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/views/register.scss";
</style>
