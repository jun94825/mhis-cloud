<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="back"></i>
      <p>編輯分類</p>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <div class="inside-item">
          <p>Parent Cat</p>
          <el-cascader
            :options="parentList"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            placeholder="請選擇"
          ></el-cascader>
        </div>
        <div class="inside-item">
          <p>Description</p>
          <el-input v-model="data.desc" :placeholder="data.desc"></el-input>
        </div>
        <el-button type="primary" size="small" @click="edit">修改</el-button>
        <el-button type="danger" size="small" @click="del">刪除</el-button>
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
      parentList: [],
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    del() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Category/Delete/${this.id}`;
      this.$http.delete(api)
        .then((res) => {
          if (res.data.success) {
            this.$message({ type: 'success', center: true, message: '刪除成功' });
            this.$store.commit('LOADING', false);
            this.$router.push({ name: 'Category' });
          }
        });
    },
    edit() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Category/Edit`;
      delete this.data.category;
      delete this.data.itemCode;
      delete this.data.parentCategoryId;
      const dataJS = JSON.stringify(this.data);
      this.$http.post(api, dataJS)
        .then((res) => {
          if (res.data.success) {
            this.$message({ type: 'success', center: true, message: '修改成功' });
            this.$store.commit('LOADING', false);
            this.$router.push({ name: 'Category' });
          }
        });
    },
    getCurrentCat() {
      const api = `http://${this.domain}.upis.info/Api/Category/Edit/${this.id}`;
      this.$http.get(api)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.data = res.data.content;
          }
        })
        .catch(() => {
          this.$message({ type: 'warning', center: 'center', message: '連線逾時，請重新登入' });
          this.$store.commit('LOADING', false);
          this.$router.push({ name: 'Login' });
        });
    },
    getOptions() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Category/Options`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success === true) {
            const r = res.data.content.lists[0].list;
            r.forEach((item) => {
              const i = item;
              i.value = i.label;
              i.children = i.list;
              delete i.list;
              i.children.forEach((value) => {
                const v = value;
                v.value = v.label;
              });
            });
            this.parentList = r;
          }
          this.$store.commit('LOADING', false);
        })
        .catch(() => {
          this.$message({ type: 'warning', center: 'center', message: '連線逾時，請重新登入' });
          this.$store.commit('LOADING', false);
          this.$router.push({ name: 'Login' });
        });
    },
    handleChange(value) {
      this.parentList.forEach((item) => {
        item.children.forEach((i) => {
          if (i.value === value[1]) {
            this.data.parentId = i.id;
          }
        });
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
  created() {
    const { href } = window.location;
    this.id = href.substring(href.indexOf('=') + 1, href.length);
    this.$store.commit('VERIFY');
    this.getOptions();
    this.getCurrentCat();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
