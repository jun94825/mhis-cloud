<template>
  <div>
    <el-row class="sys-header">
      <p>角色維護</p>
    </el-row>
    <el-row class="form">
      <div class="form-inside">
        <el-button type="primary" size="small" @click="toCreatePage">新增角色</el-button>
        <el-row class="form-header">
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
        </el-row>
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
    const token = localStorage.getItem('cookie');
    this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.$store.commit('DOMAIN');
    this.getRoles();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/components/system/role/maintain.scss";
</style>
