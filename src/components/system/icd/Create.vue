<template>
  <div>
    <el-row class="sys-header">
      <p>新增 ICD 10</p>
    </el-row>
    <el-row class="form">
      <div class="form-inside">
        <div style="display: flex; align-items: center; margin-bottom: 25px;">
          <p>Name：</p>
          <el-input v-model="data.stdName" placeholder="請輸入 Name"></el-input>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 25px;">
          <p>ICD 10 Code：</p>
          <el-input v-model="data.code" placeholder="請輸入 ICD 10 Code"></el-input>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 25px;">
          <p>Type：</p>
          <el-select v-model="data.type" placeholder="請選擇">
            <el-option v-for="(item, index) in options" :key="index" :value="item"></el-option>
          </el-select>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 25px;">
          <el-checkbox v-model="data.alert">Report Table</el-checkbox>
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
      options: ['PCS', 'cm2'],
      data: {
        code: '',
        type: '',
        stdName: '',
        alert: false,
      },
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    create() {
      const api = `http://${this.domain}.upis.info/Api/ICD10/Create`;
      this.$store.commit('LOADING', true);
      const dataJS = JSON.stringify(this.data);
      this.$http.post(api, dataJS)
        .then((res) => {
          console.log(res);
          this.$store.commit('LOADING', false);
        });
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
@import "../../../assets/styles/components/system/role/sharing.scss";
</style>
