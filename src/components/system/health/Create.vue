<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="previousPage"></i>
      <p>{{ $t("createHealthEducation") }}</p>
    </el-row>
    <div class="sys-main">
      <div class="main-inside">
        <div class="inside-item">
          <p class="required" style="width: 15rem;">
            Health Education Category
          </p>
          <el-select v-model="data.typeId" :placeholder="$t('select')">
            <el-option
              v-for="(item, index) in selectList"
              :label="item.label"
              :value="item.id"
              :key="index"
            ></el-option>
          </el-select>
        </div>
        <div class="inside-item">
          <p class="required" style="width: 15rem;">Health Education Name</p>
          <el-input v-model="data.name"></el-input>
        </div>
        <div class="inside-item">
          <el-checkbox v-model="data.isEnable">Enable</el-checkbox>
        </div>
        <div class="inside-item">
          <el-checkbox v-model="data.lobbyUse">Use in lobby</el-checkbox>
        </div>
        <el-button type="success" size="small" @click="create">{{
          $t("confirm")
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        typeId: '',
        name: '',
        isEnable: false,
        lobbyUse: false,
        queueMessage: '',
        roomIDs: [],
      },
      selectList: [],
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getSelectList() {
      const api = `http://${this.domain}.upis.info/Api/GetSelectList`;
      const data = {
        type: ['he'],
      };
      const dataJS = JSON.stringify(data);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success) {
          this.selectList = res.data.content.lists[0].list;
        }
      });
    },
    create() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/HealthEdu/Create`;
      const dataJS = JSON.stringify(this.data);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success) {
          console.log(res);
          this.$store.commit('LOADING', false);
        }
      });
    },
    previousPage() {
      this.$router.go(-1);
    },
  },
  created() {
    this.$store.commit('VERIFY');
    this.getSelectList();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
