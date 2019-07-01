<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <el-row type="flex" align="middle">
        <i class="el-icon-back" @click="previousPage"></i>
        <p>新增角色</p>
      </el-row>
      <el-button size="mini" type="success" @click="create">新增</el-button>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <el-input class="mb-8" size="small" v-model="roleName" placeholder="角色名稱"></el-input>
        <el-table
          stripe
          row-key="id"
          :data="data"
          default-expand-all
          v-if="JSON.stringify(data) !== '{}'"
          :tree-props="{children: 'pages', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="name" label="功能分類" min-width="250">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.all"
                v-if="scope.row.id > 5"
                @change="all(scope.row)"
              >{{ scope.row.name }}</el-checkbox>
              <p v-else style="display: inline;">{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="讀取" width="125" align="center">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.read"
                v-if="scope.row.id > 5"
                @change="cancel(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="新增" width="125" align="center">
            <template slot-scope="scope">
              <el-checkbox
                :class="scope.row.name"
                v-model="scope.row.create"
                v-if="scope.row.id > 5"
                @change="check(scope.row, 'create')"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="修改" width="125" align="center">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.edit"
                v-if="scope.row.id > 5"
                @change="check(scope.row, 'edit')"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="刪除" width="125" align="center">
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
        this.$message({ type: 'warning', center: true, message: '請先勾選讀取選項' });
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
        this.$message({ type: 'warning', center: true, message: '請輸入角色名稱' });
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
            this.$message({ type: 'success', center: true, message: '新增成功' });
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

.form-header {
  padding: 1rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  background-color: #f5f5f5;
  border-bottom: 0.0625rem solid #e2e2e2;

  .el-row {
    width: 30%;
  }
}

.category-title {
  padding: 1rem;
  font-size: 0.875rem;
  border-bottom: 0.0625rem solid #e2e2e2;

  > i {
    margin: 0 1rem;
    cursor: pointer;
    font-weight: bold;
  }
}

.category-content {
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom: 0.0625rem solid #e2e2e2;

  .fuck {
    margin-left: 2.5rem;

    > label {
      cursor: pointer;
      font-size: 0.875rem;
    }

    > input {
      margin-right: 1rem;
    }
  }

  .el-row {
    width: 30%;

    > input {
      cursor: pointer;
      zoom: 150%;
    }

    > label {
      margin-right: unset;
    }
  }
}

.el-icon-back {
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 1rem;
}
</style>
