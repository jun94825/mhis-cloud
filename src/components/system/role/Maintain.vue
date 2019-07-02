<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <p>{{ $t('RoleManagement') }}</p>
      <el-button type="primary" size="small" @click="toCreatePage">{{ $t('create') }}</el-button>
    </el-row>
    <el-row class="form">
      <div class="form-inside">
        <el-table :data="roles">
          <el-table-column label="Role Name" min-width="150">
            <template slot-scope="scope">
              <p size="medium">{{ scope.row.name }}</p>
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
          this.$message({ type: 'success', center: true, message: this.$t('sucdelete') });
        }
      });
    },
    del(index, row) {
      this.$confirm(this.$t('message'), this.$t('tooltip'), {
        type: 'warning',
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
      }).then(() => {
        this.$store.commit('LOADING', true);
        const api = `http://${this.domain}.upis.info/Api/Role/Delete/${row.id}`;
        this.$http.delete(api).then((res) => {
          if (res.data.success) {
            this.getRoles('del');
          }
        });
      }).catch(() => {
        this.$message({ type: 'info', center: true, message: this.$t('undelete') });
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
