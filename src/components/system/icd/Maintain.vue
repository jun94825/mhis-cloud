<template>
  <div>
    <el-row class="sys-header">
      <p>ICD 10 設定</p>
    </el-row>
    <el-row class="form">
      <div class="form-inside">
        <el-table id="table" :data="data">
          <el-table-column label="ICD 10 Code" min-width="150">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.icd10Code }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Name" min-width="500">
            <template slot-scope="scope">
              <span>{{ scope.row.stdName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Type" min-width="75" align="center">
            <template slot-scope="scope">
              <el-tag size="medium" type="info">{{ scope.row.type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Report Table" min-width="100" align="center">
            <template slot-scope="scope">
              <i class="el-icon-check" v-if="scope.row.alert"></i>
              <i class="el-icon-close" v-if="!scope.row.alert"></i>
            </template>
          </el-table-column>
          <el-table-column min-width="150" align="right">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="toCreatePage">新增</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          layout="prev, pager, next"
          background
          :page-size="pageSize"
          :total="total"
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
      pageSize: 15,
      total: 150817,
      data: [],
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getList(num = 1) {
      const api = `http://${this.domain}.upis.info/Api/ICD10/List/${num}`;
      this.$store.commit('LOADING', true);
      const data = {
        keyword: '',
        orderby: 'icd10Code',
        orderByDesc: true,
      };
      const dataJS = JSON.stringify(data);
      this.$http.post(api, dataJS)
        .then((res) => {
          console.log(res);
          this.data = res.data.content.list;
          this.$store.commit('LOADING', false);
          console.log(this.data);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    toCreatePage() {
      this.$router.push({ name: 'ICD10Create' });
    },
    /* pagination */
    handleCurrentChange(val) {
      this.getList(val);
      console.log(val);
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

#table {
  width: 100%;
}

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
    margin-top: 2rem;
  }
}
</style>
