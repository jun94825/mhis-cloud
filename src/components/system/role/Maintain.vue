<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <p>角色維護</p>
      <el-button type="success" size="mini" @click="toCreatePage">新增</el-button>
    </el-row>
    <el-row class="form">
      <div class="form-inside">
        <el-table :data="roles">
          <el-table-column label="角色名稱" min-width="150">
            <template slot-scope="scope">
              <p size="medium">{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column width="75" align="right">
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
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getRoles(val) {
      const api = `http://${this.domain}.upis.info/Api/Role/List`;
      this.$store.commit('LOADING', true);
      this.$http.get(api).then((res) => {
        this.roles = res.data.content.roles;
        this.$store.commit('LOADING', false);
        if (val === 'del') {
          this.$message({ type: 'success', center: true, message: '删除成功!' });
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
        const api = `http://${this.domain}.upis.info/Api/Role/Delete/${row.id}`;
        this.$http.delete(api).then((res) => {
          if (res.data.success) {
            this.getRoles('del');
          }
        });
      }).catch(() => {
        this.$message({ type: 'info', center: true, message: '已取消删除' });
      });
    },
    toCreatePage() {
      this.$router.push({ name: 'RoleCreate' });
    },
    toEditPage(index, row) {
      this.$router.push({ name: 'RoleEdit', query: { key: row.id } });
    },
  },
  created() {
    this.$store.commit('VERIFY');
    this.getRoles();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
