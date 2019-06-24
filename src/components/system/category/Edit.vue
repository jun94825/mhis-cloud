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
            v-model="parentValue"
            :options="parentList"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            placeholder="請選擇"
          ></el-cascader>
        </div>
        <div class="inside-item">
          <p>Description</p>
          <el-input v-model="desc"></el-input>
        </div>
        <el-button type="primary" size="small">修改</el-button>
        <el-button type="danger" size="small">刪除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      desc: '',
      parentList: [],
      parentValue: [],
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
          alert('連線逾時');
        });
    },
    handleChange(value) {
      console.log(value);
    },
    back() {
      this.$router.go(-1);
    },
  },
  created() {
    this.$store.commit('VERIFY');
    this.getOptions();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
