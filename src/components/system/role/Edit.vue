<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <el-row type="flex" align="middle">
        <i class="el-icon-back" @click="previousPage"></i>
        <p>{{ $t('editRole') }}</p>
      </el-row>
      <el-button size="small" type="success" @click="edit">{{ $t('confirm') }}</el-button>
    </el-row>
    <div class="sys-main">
      <div class="main-inside">
        <el-tag>{{ roleName }}</el-tag>
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
                v-model="scope.row.all"
                v-if="scope.row.id > 5"
                @change="all(scope.row)"
              >{{ $t(scope.row.name) }}</el-checkbox>
              <p v-else style="display: inline;">{{ $t(scope.row.name) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="Read" width="125" align="center">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.read"
                v-if="scope.row.id > 5"
                @change="cancel(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="Create" width="125" align="center">
            <template slot-scope="scope">
              <el-checkbox
                :class="scope.row.name"
                v-model="scope.row.create"
                v-if="scope.row.id > 5"
                @change="check(scope.row, 'create')"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="Modify" width="125" align="center">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.edit"
                v-if="scope.row.id > 5"
                @change="check(scope.row, 'edit')"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="Delete" width="125" align="center">
            <template slot-scope="scope">
              <el-checkbox
                :class="scope.row.name"
                v-model="scope.row.delete"
                v-if="scope.row.id > 5"
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
      const api = `http://${this.domain}.upis.info/Api/Page/All`;
      this.$store.commit('LOADING', true);
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          const r = res.data.content.pageList;
          r.forEach((item, index) => {
            r[index].pages.forEach((value) => {
              const v = value;
              v.num = 0;
              v.all = false;
              v.read = false;
              v.edit = false;
              v.create = false;
              v.delete = false;
            });
          });
          this.$nextTick(() => {
            this.getCurrentRole(r);
          });
        }
      });
    },
    getCurrentRole(data) {
      const api = `http://${this.domain}.upis.info/Api/Role/Edit/${this.id}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          const r = res.data.content.pages;
          this.roleName = res.data.content.roleName;
          r.forEach((item) => {
            const i = item;
            if (i.read && i.create && i.edit && i.delete) {
              i.num = 3;
              i.all = true;
            } else if (i.create && i.edit) {
              i.num = 2;
            } else if (i.create && i.delete) {
              i.num = 2;
            } else if (i.edit && i.delete) {
              i.num = 2;
            } else if (i.create || i.edit || i.delete) {
              i.num = 1;
            } else {
              i.num = 0;
              i.all = false;
            }
            if (i.id > 9 && i.id < 22) {
              data[2].pages.forEach((value, index) => {
                if (i.id === value.id) {
                  this.$set(data[2].pages, index, i);
                } else if (i.id === 21 && i.read === true && i.edit === true) {
                  i.all = true; // Not very Good!
                }
              });
            } else if (i.id === 22) {
              data[1].pages.forEach((value, index) => {
                if (i.id === value.id) {
                  this.$set(data[1].pages, index, i);
                }
              });
            } else if (i.id === 23) {
              data[0].pages.forEach((value, index) => {
                if (i.id === value.id) {
                  this.$set(data[0].pages, index, i);
                }
              });
            }
          });
        }
      });
      this.data = data;
      this.$nextTick(() => {
        const s = document.querySelectorAll('.Setting');
        s.forEach((item) => {
          const i = item;
          i.style.visibility = 'hidden';
        });
      });
      this.$store.commit('LOADING', false);
    },
    edit() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Role/Edit`;
      const concat = [];
      for (let i = 0; i < this.data.length; i += 1) {
        this.data[i].pages.forEach((item) => {
          concat.push(item);
        });
      }
      const require = concat
        .filter(item => item.read || item.create || item.edit || item.delete);
      require.forEach((item, index) => {
        delete require[index].all;
        delete require[index].name;
        delete require[index].num;
      });
      const dataJS = JSON.stringify({
        list: require,
        roleId: this.id,
      });
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success) {
          this.$message({ type: 'success', center: true, message: this.$t('editCompleted') });
          this.$router.push({ name: 'RoleManagement' });
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
    previousPage() {
      this.$router.go(-1);
    },
  },
  created() {
    const { href } = window.location;
    this.id = href.substring(href.indexOf('=') + 1, href.length);
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
