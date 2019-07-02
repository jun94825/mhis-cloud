<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="previousPage"></i>
      <p>{{ $t('createCat') }}</p>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <div class="inside-item">
          <p>Category</p>
          <el-select v-model="data.categoryId" placeholder="請選擇">
            <el-option
              v-for="(item, index) in categoryList"
              :label="item.label"
              :value="item.id"
              :key="index"
            ></el-option>
          </el-select>
        </div>
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
          <p class="required">Item Code</p>
          <el-input v-model="data.itemCode"></el-input>
        </div>
        <div class="inside-item">
          <p class="required">Description</p>
          <el-input v-model="data.desc"></el-input>
        </div>
        <el-button type="success" size="small" @click="create">{{ $t('confirm') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        desc: '',
        itemCode: '',
        parentId: '',
        categoryId: '',
      },
      parentList: [],
      categoryList: [],
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getOptions() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Category/Options`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          const r = res.data.content.lists[0].list;
          this.categoryList = r;
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
      });
    },
    create() {
      if (this.data.desc === '' || this.data.itemCode === '') {
        this.$message({ type: 'warning', center: 'center', message: 'Item Code 與 Description 為必填' });
      } else {
        this.$store.commit('LOADING', true);
        const api = `http://${this.domain}.upis.info/Api/Category/Create`;
        const dataJS = JSON.stringify(this.data);
        this.$http.post(api, dataJS).then((res) => {
          if (res.data.success) {
            this.$message({ type: 'success', center: true, message: '新增成功' });
            this.$router.push({ name: 'Category' });
          }
        });
      }
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
    this.getOptions();
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
