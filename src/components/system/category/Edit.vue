<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="previousPage"></i>
      <p>{{ $t('editCat') }}</p>
    </el-row>
    <div class="sys-main">
      <div class="main-inside">
        <div class="inside-item">
          <p>Parent Cat</p>
          <el-cascader
            :options="parentList"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            v-model="showParentCat[0]"
            :placeholder="$t('select')"
          ></el-cascader>
        </div>
        <div class="inside-item">
          <p>Category</p>
          <el-tag>{{ data.category }}</el-tag>
        </div>
        <div class="inside-item">
          <p>Code</p>
          <el-tag>{{ data.itemCode }}</el-tag>
        </div>
        <div class="inside-item">
          <p>Description</p>
          <el-input v-model="data.desc" :placeholder="data.desc"></el-input>
        </div>
        <el-button type="success" size="small" @click="edit">{{ $t('confirm') }}</el-button>
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
      placeholder: '',
      showParentCat: [],
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getCurrentCat() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Category/Edit/${this.id}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.data = res.data.content;
          this.getOptions();
        }
      });
    },
    getOptions() {
      const api = `http://${this.domain}.upis.info/Api/Category/Options`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
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
          /* find parent category */
          if (this.data.parentId === null) {
            this.placeholder = '請選擇';
          } else {
            const list = [];
            this.parentList.forEach((item) => {
              if (this.data.parentCategoryId === item.id) {
                list.push(item.label);
              }
              item.children.forEach((i) => {
                if (this.data.parentId === i.id) {
                  list.push(i.label);
                }
              });
            });
            this.showParentCat.push(list);
          }
        }
        this.$store.commit('LOADING', false);
      });
    },
    edit() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Category/Edit`;
      delete this.data.category;
      delete this.data.itemCode;
      delete this.data.parentCategoryId;
      const dataJS = JSON.stringify(this.data);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success) {
          this.$message({ type: 'success', center: true, message: '修改成功' });
          this.$router.push({ name: 'Category' });
        }
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
    previousPage() {
      this.$router.go(-1);
    },
  },
  created() {
    const { href } = window.location;
    this.id = href.substring(href.indexOf('=') + 1, href.length);
    this.$store.commit('VERIFY');
    this.getCurrentCat();
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
