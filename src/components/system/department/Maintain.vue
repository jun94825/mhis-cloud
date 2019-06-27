<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <p>科別</p>
      <el-button size="mini" type="success" @click="toCreatePage">新增</el-button>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <el-row class="mb-8 mr-auto" type="flex">
          <el-input size="small" v-model="search.keyword" placeholder="Keyword"></el-input>
          <el-button class="ml-16" type="primary" size="small" @click="getList">搜尋</el-button>
          <el-button class="ml-16" type="info" size="small" @click="getList('reset')">重置</el-button>
        </el-row>
        <el-table :data="data.list">
          <el-table-column label="Category Name" width="175">
            <template slot-scope="scope">
              <span>{{ scope.row.parentDept }}</span>
            </template>
          </el-table-column>
          <el-table-column label="No." width="125">
            <template slot-scope="scope">
              <span>{{ scope.row.deptNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Department Name" min-width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.deptName }}</span>
            </template>
          </el-table-column>
          <el-table-column width="75" align="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="toEditPage(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column width="75" align="right">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        deptId: '',
        keyword: '',
        orderBy: 'id',
        canBeReg: null,
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
    getList(value) {
      if (value === 'reset') {
        this.search.keyword = '';
      }
      const api = `http://${this.domain}.upis.info/Api/Dept/List/${this.currentPage}`;
      const dataJS = JSON.stringify(this.search);
      console.log(dataJS);
      this.$http.post(api, dataJS)
        .then((res) => {
          console.log(res);
          this.data = res.data.content;
        });
    },
    toCreatePage() {
      this.$router.push({ name: 'DepartmentCreate' });
    },
    toEditPage(index, row) {
      this.$router.push({ name: 'DepartmentEdit', query: { key: row.id } });
    },
    del(index, item) {
      this.$confirm('此操作將永久刪除該文件，是否繼續？', '提示', {
        type: 'warning',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$store.commit('LOADING', true);
        const api = `http://${this.domain}.upis.info/Api/Dept/Delete/${item.id}`;
        this.$http.delete(api)
          .then((res) => {
            if (res.data.success) {
              this.$store.commit('LOADING', false);
              this.$message({
                type: 'success',
                message: '刪除成功!',
              });
              this.getList();
            }
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除',
        });
      });
    },
  },
  created() {
    this.$store.commit('VERIFY');
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";

.form-inside {
  display: flex;
  align-items: center;
  flex-direction: column;

  .pagination {
    margin-top: 2rem;
  }
}
</style>
