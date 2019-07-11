<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="previousPage"></i>
      <p>{{ $t('editDept') }}</p>
    </el-row>
    <div class="sys-main">
      <div class="main-inside">
        <div class="inside-item">
          <p>Category Name</p>
          <el-tag>{{ data.parentDept }}</el-tag>
        </div>
        <div class="inside-item">
          <p>Deparent No</p>
          <el-tag>{{ data.deptNo }}</el-tag>
        </div>
        <div class="inside-item">
          <p>Deparent Name</p>
          <el-input v-model="data.deptName" :placeholder="data.deptName"></el-input>
        </div>
        <div class="inside-item">
          <el-checkbox v-model="data.canBeReg">Allow Appointments</el-checkbox>
        </div>
        <el-button type="success" size="small" @click="edit">{{ $t('confirm') }}</el-button>
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
    getCurrentDept() {
      const api = `http://${this.domain}.upis.info/Api/Dept/Edit/${this.id}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          if (res.data.content.parentDept === '') {
            res.data.content.parentDept = '一';
          }
          this.data = res.data.content;
        }
      });
    },
    edit() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Dept/Edit`;
      const data = {
        id: this.id,
        deptName: this.data.deptName,
        canBeReg: this.data.canBeReg,
      };
      const dataJS = JSON.stringify(data);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success) {
          this.$message({ type: 'success', center: true, message: '修改成功' });
          this.$router.push({ name: 'Department' });
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
    this.getCurrentDept();
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
