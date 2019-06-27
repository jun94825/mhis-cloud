<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="back"></i>
      <p>編輯診間</p>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getCurrentRoom() {
      const api = `http://${this.domain}.upis.info/Api/Room/Edit/${this.id}`;
      this.$http.get(api).then((res) => {
        console.log(res);
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
    this.getCurrentRoom();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
