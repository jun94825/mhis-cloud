<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <p>{{ $t('Room') }}</p>
      <el-button size="small" type="primary" @click="toCreatePage">{{ $t('create') }}</el-button>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <el-row class="mb-8 mr-auto" type="flex">
          <el-input size="small" v-model="search.keyword" :placeholder="$t('keyword')"></el-input>
          <el-button class="ml-16" type="warning" size="small" @click="getList">{{ $t('search') }}</el-button>
          <el-button
            class="ml-16"
            type="info"
            size="small"
            @click="getList('reset')"
          >{{ $t('reset') }}</el-button>
        </el-row>
        <el-table :data="data.list">
          <el-table-column label="Room No" width="175">
            <template slot-scope="scope">
              <span>{{ scope.row.roomNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Room Name" width="175">
            <template slot-scope="scope">
              <span>{{ scope.row.roomName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Allow Departments" min-width="350">
            <template slot-scope="scope">
              <span>{{ scope.row.usedByDepartments }}</span>
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
        dept: '',
        keyword: '',
        orderBy: 'roomNo',
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
      const api = `http://${this.domain}.upis.info/Api/Room/List/${this.currentPage}`;
      const dataJS = JSON.stringify(this.search);
      this.$http.post(api, dataJS).then((res) => {
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
        const api = `http://${this.domain}.upis.info/Api/Room/Delete/${row.id}`;
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
      this.$router.push({ name: 'RoomCreate' });
    },
    toEditPage(index, row) {
      this.$router.push({ name: 'RoomEdit', query: { key: row.id } });
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
