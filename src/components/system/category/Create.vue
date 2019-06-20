<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="back"></i>
      <p>新增分類</p>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <div style="display: flex; align-items: center; margin-bottom: 25px;">
          <p>Description：</p>
          <el-input v-model="data.desc" placeholder="請輸入 Description" style="width: 300px;"></el-input>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 25px;">
          <p>Item Code：</p>
          <el-input v-model="data.itemCode" placeholder="請輸入 Item Code" style="width: 300px;"></el-input>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 25px;">
          <p>Parent Id：</p>
          <el-input v-model="data.parentId" placeholder="請輸入 Parent Id" style="width: 300px;"></el-input>
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
      data: {
        desc: '',
        parentId: '',
        itemCode: '',
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
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/CodeFile/Create`;
      const dataJS = JSON.stringify(this.data);
      console.log(dataJS);
      this.$http.post(api, dataJS)
        .then((res) => {
          console.log(res);
          if (res.data.success === true) {
            this.$message({
              message: '新增成功',
              type: 'success',
              center: true,
            });
            this.$router.push({ name: 'Category' });
          }
        });
    },
    getSelectList() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/GetSelectList`;
      const data = {
        type: [],
      };
      const dataJS = JSON.stringify(data);
      this.$http.post(api, dataJS)
        .then((res) => {
          if (res.data.success === true) {
            console.log(res);
          }
          this.$store.commit('LOADING', false);
        });
    },
    back() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getSelectList();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/components/system/role/sharing.scss";
</style>
