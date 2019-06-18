<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="back"></i>
      <p>編輯 ICD 10</p>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <div style="display: flex; align-items: center; margin-bottom: 25px;">
          <p>ICD 10 Code：</p>
          <el-tag>{{ data.icd10Code }}</el-tag>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 25px;">
          <p>Name：</p>
          <el-input v-model="data.stdName" style="width: 500px;"></el-input>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 25px;">
          <p>Type：</p>
          <el-tag>{{ data.type }}</el-tag>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 25px;">
          <el-checkbox v-model="data.alert">Report Table</el-checkbox>
        </div>
        <el-button type="primary" size="small" @click="editICD">修改</el-button>
        <el-button type="danger" size="small" @click="delICD">刪除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      data: {},
      options: ['PCS', 'cm'],
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getICD() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/ICD10/Edit/${this.id}`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success === true) {
            this.data = res.data.content;
            this.$store.commit('LOADING', false);
          }
        });
    },
    editICD() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/ICD10/Edit`;
      this.data.code = this.data.icd10Code;
      delete this.data.icd10Code;
      const dataJS = JSON.stringify(this.data);
      this.$http.post(api, dataJS)
        .then((res) => {
          if (res.data.success === true) {
            this.$message({
              message: '修改成功',
              type: 'success',
              center: true,
            });
            this.$router.push({ name: 'ICD10' });
          }
        });
    },
    delICD() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/ICD10/Delete/${this.data.id}`;
      this.$http.delete(api)
        .then((res) => {
          if (res.data.success === true) {
            this.$message({
              message: '刪除成功',
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
    const { href } = window.location;
    this.id = href.substring(href.indexOf('=') + 1, href.length);
    this.$store.commit('DOMAIN');
    this.getICD();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/components/system/role/sharing.scss";
</style>
