<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <p>{{ $t('Category') }}</p>
      <el-button size="small" type="primary" @click="toCreatePage">{{ $t('create') }}</el-button>
    </el-row>
    <div class="sys-main">
      <div class="main-inside">
        <el-row class="mb-8 mr-auto" type="flex">
          <el-select size="small" v-model="search.parentId" :placeholder="$t('Category')">
            <el-option
              v-for="(item, index) in selectList"
              :key="index"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input
            class="ml-16"
            size="small"
            v-model="search.keyword"
            :placeholder="$t('keyword')"
          ></el-input>
          <el-button class="ml-16" type="warning" size="small" @click="getList">{{ $t('search') }}</el-button>
          <el-button
            class="ml-16"
            type="info"
            size="small"
            @click="getList('reset')"
          >{{ $t('reset') }}</el-button>
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
              <el-button size="mini" @click="toEditPage(scope.$index, scope.row)">{{ $t('edit') }}</el-button>
            </template>
          </el-table-column>
          <el-table-column width="100" align="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="del(scope.$index, scope.row)"
                :disabled="scope.row.locked"
              >{{ $t('delete') }}</el-button>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      search: {
        keyword: '',
        parentId: '',
        orderBy: 'id',
        orderByDesc: true,
      },
      currentPage: 1,
      selectList: [],
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
      const api = `http://${this.domain}.upis.info/Api/Category/List/${this.currentPage}`;
      if (val === 'reset') {
        this.search.keyword = '';
        this.search.parentId = '';
        this.currentPage = 1;
      }
      const searchJS = JSON.stringify(this.search);
      this.$http.post(api, searchJS).then((res) => {
        if (res.data.success) {
          this.data = res.data.content;
          this.getSelectList();
          this.$store.commit('LOADING', false);
          if (val === 'del') {
            this.$message({ type: 'success', center: 'center', message: this.$t('sucdelete') });
          }
        }
      }).catch(() => {
        this.$message({ type: 'warning', center: 'center', message: this.$t('timeOut') });
        this.$store.commit('LOADING', false);
        this.$router.push({ name: 'Login' });
      });
    },
    getSelectList() {
      const api = `http://${this.domain}.upis.info/Api/GetSelectList`;
      const data = {
        type: [],
      };
      const dataJS = JSON.stringify(data);
      this.$http.post(api, dataJS)
        .then((res) => {
          this.selectList = res.data.content.lists[0].list;
        });
    },
    del(index, row) {
      let message = '';
      if (row.childrenCnt > 0) {
        message = `此文件包含 ${row.childrenCnt} 個子項目，如確定刪除，關聯將被斷開，是否繼續？`;
      } else {
        message = this.$t('message');
      }
      this.$confirm(message, this.$t('tooltip'), {
        type: 'warning',
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
      }).then(() => {
        this.$store.commit('LOADING', true);
        const api = `http://${this.domain}.upis.info/Api/Category/Delete/${row.id}`;
        this.$http.delete(api).then((res) => {
          if (res.data.success) {
            this.$store.commit('LOADING', false);
            this.getList('del');
          }
        });
      }).catch(() => {
        this.$message({ type: 'info', center: 'center', message: this.$t('undelete') });
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    toCreatePage() {
      this.$router.push({ name: 'CategoryCreate' });
    },
    toEditPage(index, row) {
      this.$router.push({ name: 'CategoryEdit', query: { key: row.id } });
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

.main-inside {
  display: flex;
  align-items: center;
  flex-direction: column;

  .pagination {
    margin-top: 2rem;
  }
}
</style>
