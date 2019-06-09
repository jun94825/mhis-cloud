<template>
  <div>
    <el-row type="flex" align="middle" justify="center" class="header">
      <img src="../assets/images/mhis-white.png" alt>
      <p>先進醫資</p>
    </el-row>
    <el-row type="flex" justify="center" class="main">
      <el-form>
        <el-form-item class="mb-20">
          <el-select v-model="local" placeholder="請選擇語言" class="w-250">
            <el-option label="繁體中文" value="zh-tw"></el-option>
            <el-option label="English" value="en-us"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="mb-20">
          <el-input v-model="data.userName" :placeholder="$t('Account')" class="w-250"></el-input>
        </el-form-item>
        <el-form-item class="mb-20">
          <el-input v-model="data.password" placeholder="密碼" class="w-250"></el-input>
        </el-form-item>
        <el-row type="flex" align="middle" justify="space-between" class="mb-20">
          <el-form-item class="mb-0">
            <el-input v-model="data.captcha" placeholder="驗證碼" class="w-80"></el-input>
          </el-form-item>
          <img src="../assets/images/captcha.png" alt>
          <el-button icon="el-icon-refresh" circle class="mhis-primary"></el-button>
        </el-row>
        <el-row type="flex" align="middle" justify="space-between" class="mb-20">
          <el-checkbox v-model="data.remember">記住我</el-checkbox>
          <a href="#">註冊帳戶</a>
        </el-row>
        <el-button class="w-250 mhis-primary">註冊</el-button>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        key: '',
        captcha: '',
        userName: '',
        password: '',
        remember: false,
      },
      local: 'zh-tw',
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/views/login.scss";
</style>
