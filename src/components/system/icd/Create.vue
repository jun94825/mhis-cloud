<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="previousPage"></i>
      <p>{{ $t('createICD10') }}</p>
    </el-row>
    <el-row class="form">
      <div class="form-inside">
        <div class="inside-item">
          <p class="required">ICD10 Code</p>
          <el-input v-model="data.code"></el-input>
        </div>
        <div class="inside-item">
          <p class="required">Name</p>
          <el-input v-model="data.stdName"></el-input>
        </div>
        <div class="inside-item">
          <p class="required">Type</p>
          <el-select v-model="data.type" :placeholder="$t('select')">
            <el-option v-for="(item, index) in options" :key="index" :value="item"></el-option>
          </el-select>
        </div>
        <div class="inside-item">
          <el-checkbox v-model="data.alert">Reportable</el-checkbox>
        </div>
        <el-button type="success" size="small" @click="create">{{ $t('confirm') }}</el-button>
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
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success) {
          this.$message({ message: '新增成功', type: 'success', center: true });
          this.$router.push({ name: 'ICD10' });
        }
      });
    },
    previousPage() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
