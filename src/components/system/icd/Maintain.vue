<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <p>ICD 10 設定</p>
      <el-button size="mini" type="success" @click="toCreatePage">新增</el-button>
    </el-row>
    <el-row class="form">
      <div class="form-inside">
        <el-row class="mb-8 mr-auto" type="flex">
          <el-input
            v-model="search.keyword"
            placeholder="Keyword"
            size="small"
            @keyup.enter.native="getList"
          ></el-input>
          <el-button class="ml-16" type="primary" size="small" @click="getList">搜尋</el-button>
        </el-row>
        <el-table id="table" :data="data.list">
          <el-table-column label="ICD 10 Code" width="125">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.icd10Code }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Name" min-width="500">
            <template slot-scope="scope">
              <span>{{ scope.row.stdName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Type" width="100" align="center">
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
              <el-button size="mini" @click="toEditPage(scope.$index, scope.row)">编辑</el-button>
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
    getList() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/ICD10/List/${this.currentPage}`;
      const dataJS = JSON.stringify(this.search);
      this.$http.post(api, dataJS)
        .then((res) => {
          this.data = res.data.content;
          this.$store.commit('LOADING', false);
        });
    },
    toCreatePage() {
      this.$router.push({ name: 'ICD10Create' });
    },
    toEditPage(index, row) {
      this.$router.push({ name: 'ICD10Edit', query: { key: row.id } });
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

// #table {
//   width: 100%;
// }

.el-icon-check {
  font-size: 1.25rem;
  font-weight: bold;
  color: #67c23a;
}

.el-icon-close {
  font-size: 1.25rem;
  font-weight: bold;
  color: #f56c6c;
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
