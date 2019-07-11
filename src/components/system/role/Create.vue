<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <el-row type="flex" align="middle">
        <i class="el-icon-back" @click="previousPage"></i>
        <p>{{ $t('createRole') }}</p>
      </el-row>
      <el-button size="small" type="success" @click="create">{{ $t('confirm') }}</el-button>
    </el-row>
    <div class="sys-main">
      <div class="main-inside">
        <el-input class="mb-8" size="small" v-model="roleName" placeholder="Role Name"></el-input>
        <el-table
          stripe
          row-key="id"
          :data="data"
          default-expand-all
          v-if="JSON.stringify(data) !== '{}'"
          :tree-props="{children: 'pages', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="name" label="Finctional" min-width="250">
            <template slot-scope="scope">
              <el-checkbox
                v-if="scope.row.id > 5"
                v-model="scope.row.all"
                @change="all(scope.row)"
              >{{ $t(scope.row.name) }}</el-checkbox>
              <p v-else style="display: inline;">{{ $t(scope.row.name) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="Read" width="125" align="center">
            <template slot-scope="scope">
              <el-checkbox
                v-if="scope.row.id > 5"
                v-model="scope.row.read"
                @change="cancel(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="Create" width="125" align="center">
            <template slot-scope="scope">
              <el-checkbox
                :class="scope.row.name"
                v-if="scope.row.id > 5"
                v-model="scope.row.create"
                @change="check(scope.row, 'create')"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="Modify" width="125" align="center">
            <template slot-scope="scope">
              <el-checkbox
                v-if="scope.row.id > 5"
                v-model="scope.row.edit"
                @change="check(scope.row, 'edit')"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="Delete" width="125" align="center">
            <template slot-scope="scope">
              <el-checkbox
                :class="scope.row.name"
                v-if="scope.row.id > 5"
                v-model="scope.row.delete"
                @change="check(scope.row, 'delete')"
              ></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      data: {},
      roleName: '',
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getPageAll() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Page/All`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          const r = res.data.content.pageList;
          r.forEach((item, index) => {
            const i = item;
            i.id = index;
            r[index].pages.forEach((val) => {
              const v = val;
              v.num = 0;
              v.all = false;
              v.read = false;
              v.edit = false;
              v.create = false;
              v.delete = false;
            });
          });
          this.data = r;
          this.$nextTick(() => {
            const s = document.querySelectorAll('.Setting');
            s.forEach((item) => {
              const i = item;
              i.style.visibility = 'hidden';
            });
          });
          this.$store.commit('LOADING', false);
        }
      });
    },
    all(row) {
      const r = row;
      if (r.all) {
        r.num = 3;
        r.read = true;
        r.edit = true;
        r.create = true;
        r.delete = true;
      } else {
        r.num = 0;
        r.read = false;
        r.edit = false;
        r.create = false;
        r.delete = false;
      }
    },
    check(row, target) {
      const r = row;
      const t = target;
      if (!r.read) {
        r.num = 0;
        r[t] = null;
        this.$message({ type: 'warning', center: true, message: this.$t('readOptionReq') });
      }
      if (r.read && window.event.target.checked) {
        r.num += 1;
      } else if (r.read) {
        r.num -= 1;
      }
      if (r.num === 3) {
        r.all = true;
      } else {
        r.all = false;
      }
      /* only for setting */
      if (r.name === 'Setting' && r.read && r.num === 1) {
        r.all = true;
      } else if (r.name === 'Setting' && r.num === 0) {
        r.all = false;
      }
    },
    cancel(row) {
      const r = row;
      if (!r.read) {
        r.num = 0;
        r.all = false;
        r.edit = false;
        r.create = false;
        r.delete = false;
      }
    },
    create() {
      if (this.roleName === '') {
        this.$message({ type: 'warning', center: true, message: this.$t('roleReqMes') });
      } else {
        this.$store.commit('LOADING', true);
        const api = `http://${this.domain}.upis.info/Api/Role/Create`;
        const concat = [];
        for (let i = 0; i < this.data.length; i += 1) {
          this.data[i].pages.forEach((item) => {
            concat.push(item);
          });
        }
        const required = concat
          .filter(item => item.read || item.create || item.edit || item.delete);
        required.forEach((item, index) => {
          delete required[index].all;
          delete required[index].name;
          delete required[index].num;
        });
        const dataJS = JSON.stringify({
          list: required,
          roleName: this.roleName,
        });
        this.$http.post(api, dataJS).then((res) => {
          if (res.data.success) {
            this.$message({ type: 'success', center: true, message: this.$t('sucAdded') });
            this.$router.push({ name: 'RoleManagement' });
          }
        });
      }
    },
    previousPage() {
      this.$router.go(-1);
    },
  },
  created() {
    this.$store.commit('VERIFY');
    this.getPageAll();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";

.el-input {
  width: 10rem;
}
</style>
