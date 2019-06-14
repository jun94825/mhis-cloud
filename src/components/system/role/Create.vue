<template>
  <div>
    <el-row type="flex" align="middle" justify="space-between" class="sys-header">
      <el-row type="flex" align="middle">
        <i class="el-icon-back" @click="back"></i>
        <p>編輯角色權限</p>
      </el-row>
      <el-button type="primary" size="small" @click="createRole">新增</el-button>
    </el-row>
    <el-row class="form">
      <div class="form-inside">
        <el-input size="small" placeholder="請輸入角色名稱" v-model="roleName"></el-input>
        <el-row type="flex" align="middle" justify="space-between" class="form-header">
          <p>功能分類</p>
          <el-row type="flex" align="middle" justify="space-around">
            <p>讀取</p>
            <p>新增</p>
            <p>修改</p>
            <p>刪除</p>
          </el-row>
        </el-row>
        <div v-for="(val, index) in data" :key="index">
          <el-row type="flex" align="middle" class="category-title">
            <i class="el-icon-plus"></i>
            <p>{{ $t(val.scopeName) }}</p>
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
              <label :for="v.id">{{ $t(v.name) }}</label>
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
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Page/All`;
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
            const setting = document.getElementById('Setting');
            setting.children[1].children[1].style.visibility = 'hidden';
            setting.children[1].children[3].style.visibility = 'hidden';
          });
          this.$store.commit('LOADING', false);
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
    createRole() {
      const api = `http://${this.domain}.upis.info/Api/Role/Create`;
      if (this.roleName === '') {
        this.$message({
          type: 'warning',
          center: true,
          message: '請輸入角色名稱',
        });
      } else {
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
          roleName: this.roleName,
          list: require,
        });
        this.$http.post(api, dataJS)
          .then((res) => {
            if (res.data.success === true) {
              this.$store.commit('LOADING', false);
              this.$message({
                type: 'success',
                center: true,
                message: '新增成功',
              });
              this.$router.push({ name: '角色維護' });
            }
          });
      }
    },
  },
  created() {
    const token = localStorage.getItem('cookie');
    this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.$store.commit('DOMAIN');
    this.getPageAll();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/components/system/role/sharing.scss";
</style>
