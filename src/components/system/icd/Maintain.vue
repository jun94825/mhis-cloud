<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <p>ICD10 設定</p>
      <el-button size="mini" type="success" @click="toCreatePage">新增</el-button>
    </el-row>
    <el-row class="form">
      <div class="form-inside">
        <el-row class="mb-8 mr-auto" type="flex">
          <el-input size="small" v-model="search.keyword" placeholder="Keyword"></el-input>
          <el-button class="ml-16" type="primary" size="small" @click="getList">搜尋</el-button>
          <el-button class="ml-16" type="info" size="small" @click="getList('reset')">重置</el-button>
        </el-row>
        <el-table :data="data.list">
          <el-table-column label="ICD10 Code" width="150">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.icd10Code }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Name" min-width="500">
            <template slot-scope="scope">
              <span>{{ scope.row.stdName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Type" width="125" align="center">
            <template slot-scope="scope">
              <el-tag size="medium" type="info">{{ scope.row.type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Reportable" width="125" align="center">
            <template slot-scope="scope">
              <i class="el-icon-check" v-if="scope.row.alert"></i>
              <i class="el-icon-close" v-if="!scope.row.alert"></i>
            </template>
          </el-table-column>
          <el-table-column width="100" align="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="toEditPage(scope.$index, scope.row)">編輯</el-button>
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
          :current-page="data.page"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      search: {
        keyword: '',
        orderby: 'icd10Code',
        orderByDesc: true,
      },
      currentPage: 1,
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getList(val) {
      this.$store.commit('LOADING', true);
      if (val === 'reset') {
        this.search.keyword = '';
        this.currentPage = 1;
      }
      const api = `http://${this.domain}.upis.info/Api/ICD10/List/${this.currentPage}`;
      const searchJS = JSON.stringify(this.search);
      this.$http.post(api, searchJS).then((res) => {
        if (res.data.success) {
          this.data = res.data.content;
          this.$store.commit('LOADING', false);
          if (val === 'del') {
            this.$message({ type: 'success', center: 'center', message: '刪除成功!' });
          }
        }
      });
    },
    del(index, row) {
      this.$confirm('此操作將永久刪除該文件，是否繼續？', '提示', {
        type: 'warning',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$store.commit('LOADING', true);
        const api = `http://${this.domain}.upis.info/Api/ICD10/Delete/${row.id}`;
        this.$http.delete(api).then((res) => {
          if (res.data.success) {
            this.$store.commit('LOADING', false);
            this.getList('del');
          }
        });
      }).catch(() => {
        this.$message({ type: 'info', center: 'center', message: '已取消刪除' });
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    toCreatePage() {
      this.$router.push({ name: 'ICD10Create' });
    },
    toEditPage(index, row) {
      this.$router.push({ name: 'ICD10Edit', query: { key: row.id } });
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

.el-icon-check {
  color: #67c23a;
  font-size: 1.25rem;
  font-weight: bold;
}

.el-icon-close {
  color: #f56c6c;
  font-size: 1.25rem;
  font-weight: bold;
}

.form-inside {
  display: flex;
  align-items: center;
  flex-direction: column;

  .pagination {
    margin-top: 2.5rem;
  }
}
</style>
