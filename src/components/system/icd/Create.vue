<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="back"></i>
      <p>新增 ICD10</p>
    </el-row>
    <el-row class="form">
      <div class="form-inside">
        <div class="inside-item">
          <p>ICD10 Code</p>
          <el-input v-model="data.code"></el-input>
        </div>
        <div class="inside-item">
          <p>Name</p>
          <el-input v-model="data.stdName"></el-input>
        </div>
        <div class="inside-item">
          <p>Type</p>
          <el-select v-model="data.type" placeholder="請選擇">
            <el-option v-for="(item, index) in options" :key="index" :value="item"></el-option>
          </el-select>
        </div>
        <div class="inside-item">
          <el-checkbox v-model="data.alert">Reportable</el-checkbox>
        </div>
        <el-button type="primary" size="small" @click="create">送出</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        code: '',
        type: '',
        stdName: '',
        alert: false,
      },
      options: ['PCS', 'cm'],
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    create() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/ICD10/Create`;
      const dataJS = JSON.stringify(this.data);
      this.$http.post(api, dataJS)
        .then((res) => {
          if (res.data.success === true) {
            this.$message({
              message: '新增成功',
              type: 'success',
              center: true,
            });
            this.$router.push({ name: 'ICD10' });
          }
        });
    },
    back() {
      this.$router.go(-1);
    },
  },
  created() {
    const token = localStorage.getItem('cookie');
    this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.$store.commit('DOMAIN');
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
