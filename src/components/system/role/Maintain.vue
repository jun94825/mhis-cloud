<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <p>角色維護</p>
      <el-button type="primary" size="small" @click="toCreatePage">新增角色</el-button>
    </el-row>
    <el-row class="form">
      <div class="form-inside">
        <el-table :data="roles">
          <el-table-column label="角色名稱" min-width="150">
            <template slot-scope="scope">
              <p size="medium">{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column width="150" align="right">
            <template slot-scope="scope">
              <i class="el-icon-edit-outline" @click="toEditPage(scope.row.id)"></i>
              <i class="el-icon-delete" @click="checkDelRole(scope.row.id, scope.row.name)"></i>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-row class="inside-header">
          <p>角色名稱</p>
        </el-row>
        <el-row
          type="flex"
          align="middle"
          justify="space-between"
          class="roles"
          v-for="(item, index) in roles"
          :key="index"
        >
          <p>{{ item.name }}</p>
          <div>
            <i class="el-icon-edit-outline" @click="toEditPage(item.id)"></i>
            <i class="el-icon-delete" @click="checkDelRole(item.id, item.name)"></i>
          </div>
        </el-row>-->
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
    getRoles(bol = false) {
      const api = `http://${this.domain}.upis.info/Api/Role/List`;
      this.$store.commit('LOADING', true);
      this.$http.get(api)
        .then((res) => {
          this.roles = res.data.content.roles;
          this.$store.commit('LOADING', false);
          if (bol) {
            this.$message({
              type: 'success',
              center: true,
              message: '删除成功!',
            });
          }
        });
    },
    delRole(id) {
      const api = `http://${this.domain}.upis.info/Api/Role/Delete/${id}`;
      this.$http.delete(api).then((res) => {
        if (res.data.success === true) {
          this.getRoles(true);
        }
      });
    },
    toCreatePage() {
      this.$router.push({ name: 'RoleCreate' });
    },
    toEditPage(id) {
      this.$router.push({ name: 'RoleEdit', query: { key: id } });
    },
    checkDelRole(id, name) {
      this.$confirm(`是否確定刪除 ${name} ?`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.delRole(id);
      }).catch(() => {
        this.$message({
          type: 'info',
          center: true,
          message: '已取消删除',
        });
      });
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

.el-icon-edit-outline {
  cursor: pointer;
  color: #007bff;
  font-size: 1.25rem;
}

.el-icon-delete {
  cursor: pointer;
  color: #dc3545;
  font-size: 1.25rem;
  margin-left: 1.5rem;
}
</style>
