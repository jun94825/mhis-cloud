<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <p>編輯科別</p>
      <el-button size="mini" type="success" @click="toCreatePage">新增</el-button>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <el-table :data="data.list">
          <el-table-column label="Room No" width="175">
            <template slot-scope="scope">
              <span>{{ scope.row.roomNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Room Name" min-width="175">
            <template slot-scope="scope">
              <span>{{ scope.row.roomName }}</span>
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
        dept: '',
        keyword: '',
        orderBy: 'id',
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
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Room/List/${this.currentPage}`;
      const dataJS = JSON.stringify(this.search);
      this.$http.post(api, dataJS)
        .then((res) => {
          this.data = res.data.content;
          this.$store.commit('LOADING', false);
        });
    },
    del(index, row) {
      this.$confirm('此操作將永久刪除該文件，是否繼續？', '提示', {
        type: 'warning',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$store.commit('LOADING', true);
        const api = `http://${this.domain}.upis.info/Api/Room/Delete/${row.id}`;
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
    toCreatePage() {
      this.$router.push({ name: 'RoomCreate' });
    },
    toEditPage(index, row) {
      this.$router.push({ name: 'RoomEdit', query: { key: row.id } });
    },
    back() {
      this.$router.go(-1);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
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
    margin-top: 2.5rem;
  }
}
</style>
