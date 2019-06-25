<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <p>分類設定</p>
      <el-button size="mini" type="success" @click="toCreatePage">新增</el-button>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <el-row class="mb-8 mr-auto" type="flex">
          <el-select size="small" v-model="search.parentId" placeholder="Category">
            <el-option
              v-for="(item, index) in selectList"
              :key="index"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input class="ml-16" size="small" v-model="search.keyword" placeholder="Keyword"></el-input>
          <el-button class="ml-16" type="primary" size="small" @click="getList">搜尋</el-button>
        </el-row>
        <el-table :data="data.list">
          <el-table-column label="Category" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.parentName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Code" width="150">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      selectList: [],
      currentPage: 1,
      search: {
        parentId: null,
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
      const api = `http://${this.domain}.upis.info/Api/Category/List/${this.currentPage}`;
      const dataJS = JSON.stringify(this.search);
      this.$http.post(api, dataJS)
        .then((res) => {
          if (res.data.success) {
            this.data = res.data.content;
            this.$store.commit('LOADING', false);
          }
        })
        .catch(() => {
          this.$message({ type: 'warning', center: 'center', message: '連線逾時，請重新登入' });
          this.$store.commit('LOADING', false);
          this.$router.push({ name: 'Login' });
        });
    },
    getSelectList() {
      const api = `http://${this.domain}.upis.info/Api/GetSelectList`;
      const data = {
        type: [''],
      };
      const dataJS = JSON.stringify(data);
      this.$http.post(api, dataJS)
        .then((res) => {
          this.selectList = res.data.content.lists[0].list;
        });
    },
    toCreatePage() {
      this.$router.push({ name: 'CategoryCreate' });
    },
    toEditPage(index, row) {
      this.$router.push({ name: 'CategoryEdit', query: { key: row.id } });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
  },
  created() {
    this.$store.commit('VERIFY');
    this.getList();
    this.getSelectList();
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
