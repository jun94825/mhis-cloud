<template>
  <div>
    <el-row type="flex" align="middle" justify="space-between" class="main-title">
      <el-row type="flex" align="middle">
        <i class="el-icon-back" @click="back"></i>
        <p>編輯角色權限</p>
      </el-row>
      <el-button type="primary" size="small" @click="editRole">儲存</el-button>
    </el-row>
    <el-row class="main-layout">
      <div class="layout-inside">
        <p>{{ roleName }}</p>
        <el-row type="flex" align="middle" justify="space-between" class="form-header">
          <p>功能分類</p>
          <el-row type="flex" align="middle" justify="space-around">
            <p>新增</p>
            <p>刪除</p>
            <p>修改</p>
            <p>讀取</p>
          </el-row>
        </el-row>
        <div v-for="(val, index) in data" :key="index">
          <el-row type="flex" align="middle" class="category-title">
            <i class="el-icon-plus"></i>
            <p>{{ val.scopeName }}</p>
          </el-row>
          <el-row
            :id="v.name"
            type="flex"
            align="middle"
            justify="space-between"
            class="category-content"
            v-for="(v, i) in val.pages"
            :key="i"
          >
            <el-row type="flex" align="middle" class="fuck">
              <input :id="v.id" type="checkbox" v-model="v.all" @click="all(v)">
              <label :for="v.id">{{ v.name }}</label>
            </el-row>
            <el-row type="flex" align="middle" justify="space-around">
              <input type="checkbox" v-model="v.read" @click="cancel(v)">
              <input type="checkbox" v-model="v.create" @click="check(v)">
              <input type="checkbox" v-model="v.edit" @click="check(v)">
              <input type="checkbox" v-model="v.delete" @click="check(v)">
            </el-row>
          </el-row>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      id: '',
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
      this.$http.get(api)
        .then((res) => {
          const r = res.data.content.pageList;
          r.forEach((item, index) => {
            r[index].pages.forEach((val) => {
              const v = val;
              v.all = false;
              v.read = false;
              v.create = false;
              v.edit = false;
              v.delete = false;
              v.num = 0;
            });
          });
          this.data = r;
          this.$nextTick(() => {
            this.getRole(r);
          });
        });
    },
    getRole(data) {
      const key = this.id.substring(this.id.indexOf('=') + 1, this.id.length);
      const api = `http://${this.domain}.upis.info/Api/Role/Edit/${key}`;
      this.$http.get(api)
        .then((res) => {
          const r = res.data.content.pages;
          this.roleName = res.data.content.roleName;
          r.forEach((item) => {
            const i = item;
            if (i.read && i.create && i.edit && i.delete) {
              i.all = true;
              i.num = 3;
            } else if (i.create && i.edit) {
              i.num = 2;
            } else if (i.create && i.delete) {
              i.num = 2;
            } else if (i.edit && i.delete) {
              i.num = 2;
            } else if (i.create || i.edit || i.delete) {
              i.num = 1;
            } else {
              i.all = false;
              i.num = 0;
            }
            if (i.id > 9 && i.id < 22) {
              data[2].pages.forEach((item, index) => {
                if (i.id === item.id) {
                  this.$set(data[2].pages, index, i);
                } else if (i.id === 21 && i.read === true && i.edit === true) {
                  i.all = true; // Not very Good!
                }
              });
            } else if (i.id === 22) {
              data[1].pages.forEach((item, index) => {
                if (i.id === item.id) {
                  this.$set(data[1].pages, index, i);
                }
              });
            } else if (i.id === 23) {
              data[0].pages.forEach((item, index) => {
                if (i.id === item.id) {
                  this.$set(data[0].pages, index, i);
                }
              });
            }
          });
        });
      this.data = data;
      this.$nextTick(() => {
        const setting = document.getElementById('Setting');
        setting.children[1].children[1].style.visibility = 'hidden';
        setting.children[1].children[3].style.visibility = 'hidden';
        this.$store.commit('LOADING', false);
      });
    },
    editRole() {
      const api = `http://${this.domain}.upis.info/Api/Role/Edit`;
      this.$store.commit('LOADING', true);
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
        roleId: this.id.substring(this.id.indexOf('=') + 1, this.id.length),
        list: require,
      });
      this.$http.post(api, dataJS)
        .then((res) => {
          if (res.data.success === true) {
            this.$store.commit('LOADING', false);
            this.$message({
              type: 'success',
              center: true,
              message: '編輯完成',
            });
            this.$router.push({ name: '角色維護' });
          }
        });
    },
    all(target) {
      const t = target;
      if (!t.all) {
        t.read = true;
        t.create = true;
        t.edit = true;
        t.delete = true;
        t.num = 3;
      } else {
        t.read = false;
        t.create = false;
        t.edit = false;
        t.delete = false;
        t.num = 0;
      }
    },
    check(target) {
      const t = target;
      if (t.read === false) {
        window.event.preventDefault();
        this.$message({
          type: 'warning',
          center: true,
          message: '請先勾選讀取選項',
        });
      }
      if (window.event.target.checked && t.read !== false) {
        t.num += 1;
      } else if (t.read === true) {
        t.num -= 1;
      }
      if (t.num === 3) {
        t.all = true;
      } else {
        t.all = false;
      }
    },
    cancel(target) {
      const t = target;
      if (t.read) {
        t.all = false;
        t.edit = false;
        t.create = false;
        t.delete = false;
        t.num = 0;
      }
    },
    back() {
      this.$router.go(-1);
    },
  },
  created() {
    const token = localStorage.getItem('cookie');
    this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.$store.commit('DOMAIN');
    this.id = window.location.href;
    this.getPageAll();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/components/system/role/edit.scss";
</style>
