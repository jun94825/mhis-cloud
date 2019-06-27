<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="previousPage"></i>
      <p>新增科別</p>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <div class="inside-item">
          <p>Category Name</p>
          <el-select v-model="data.parentId" placeholder="請選擇">
            <el-option
              v-for="(item, index) in selectList"
              :label="item.label"
              :value="item.id"
              :key="index"
            ></el-option>
          </el-select>
        </div>
        <div class="inside-item">
          <p class="required">Department No</p>
          <el-input v-model="data.deptNo"></el-input>
        </div>
        <div class="inside-item">
          <p class="required">Department Name</p>
          <el-input v-model="data.deptName"></el-input>
        </div>
        <div class="inside-item">
          <el-checkbox v-model="data.canBeReg">Allow Appointments</el-checkbox>
        </div>
        <el-button type="primary" size="small" @click="create">送出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectList: [],
      data: {
        deptNo: '',
        deptName: '',
        parentId: '',
        canBeReg: false,
      },
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getSelect() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Dept/Select`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.$store.commit('LOADING', false);
          this.selectList = res.data.content.list;
        }
      });
    },
    create() {
      if (this.data.deptNo === '' || this.data.deptName === '') {
        this.$message({ type: 'warning', center: 'center', message: 'Department No 與 Department Name 為必填' });
      } else {
        this.$store.commit('LOADING', true);
        const api = `http://${this.domain}.upis.info/Api/Dept/Create`;
        const dataJS = JSON.stringify(this.data);
        this.$http.post(api, dataJS).then((res) => {
          console.log(res);
          if (res.data.success === true) {
            this.$message({ type: 'success', center: true, message: '新增成功' });
            this.$store.commit('LOADING', false);
            this.$router.push({ name: 'Department' });
          }
        });
      }
    },
    previousPage() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getSelect();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
