<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <p>分類設定</p>
      <el-button size="mini" type="success" @click="toCreatePage">新增</el-button>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <el-table :data="data.list">
          <el-table-column label="Code" width="125">
            <template slot-scope="scope">
              <span>{{ scope.row.itemCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Description" min-width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100" align="right">
            <template slot-scope="scope">
              <el-button size="mini">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="pagination"
          layout="prev, pager, next"
          :total="data.totalRecordCnt"
          :page-size="data.pageSize"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      currentPage: 1,
      search: {
        parentId: '',
        keyword: '',
        orderBy: '',
        orderByDesc: true,
      },
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getList() {
      const api = `http://${this.domain}.upis.info/Api/CodeFile/List/${this.currentPage}`;
      // const dataJS = JSON.stringify(this.search);
      this.$http.post(api, {})
        .then((res) => {
          this.data = res.data.content;
        });
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    toCreatePage() {
      this.$router.push({ name: 'CategoryCreate' });
    },
  },
  created() {
    const token = localStorage.getItem('cookie');
    this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.$store.commit('DOMAIN');
    this.getList();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/components/system/role/sharing.scss";

.form-inside {
  display: flex;
  align-items: center;
  flex-direction: column;

  .pagination {
    margin-top: 2rem;
  }
}
</style>
