<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="previousPage"></i>
      <p>{{ $t("editICD10") }}</p>
    </el-row>
    <div class="sys-main">
      <div class="main-inside">
        <div class="inside-item">
          <p>ICD10 Code</p>
          <el-tag>{{ data.icd10Code }}</el-tag>
        </div>
        <div class="inside-item">
          <p>Name</p>
          <el-input v-model="data.stdName"></el-input>
        </div>
        <div class="inside-item">
          <p>Type</p>
          <el-tag type="info">{{ data.type }}</el-tag>
        </div>
        <div class="inside-item">
          <el-checkbox v-model="data.alert">Reportable</el-checkbox>
        </div>
        <el-button type="success" size="small" @click="edit">{{
          $t("confirm")
        }}</el-button>
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
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getCurrentICD() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/ICD10/Edit/${this.id}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.data = res.data.content;
          this.$store.commit('LOADING', false);
        }
      });
    },
    edit() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/ICD10/Edit`;
      this.data.code = this.data.icd10Code;
      delete this.data.icd10Code;
      const dataJS = JSON.stringify(this.data);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            center: 'center',
            message: '編輯成功!',
          });
          this.$router.push({ name: 'ICD10' });
        }
      });
    },
    previousPage() {
      this.$router.go(-1);
    },
  },
  created() {
    const { href } = window.location;
    this.id = href.substring(href.indexOf('=') + 1, href.length);
    this.$store.commit('VERIFY');
    this.getCurrentICD();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
