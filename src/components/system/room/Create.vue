<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="previousPage"></i>
      <p>新增診間</p>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <div class="inside-item">
          <p class="required">Room No</p>
          <el-input v-model="data.roomNo"></el-input>
        </div>
        <div class="inside-item">
          <p class="required">Room Name</p>
          <el-input v-model="data.roomName"></el-input>
        </div>
        <div class="inside-item">
          <p>ReMark</p>
          <el-input :disabled="true"></el-input>
        </div>
        <div class="inside-item">
          <p>Allow Dept.</p>
          <el-select v-model="select" multiple placeholder="請選擇">
            <el-option
              v-for="(item, index) in selectList"
              :key="index"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <el-button type="primary" size="small" @click="create">送出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        roomNo: '',
        roomName: '',
        depts: [],
      },
      selectList: [],
      select: [],
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    create() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Room/Create`;
      const dataJS = JSON.stringify(this.data);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success === true) {
          this.$message({ type: 'success', center: true, message: '新增成功' });
          this.$store.commit('LOADING', false);
          this.$router.push({ name: 'Room' });
        }
      });
    },
    getSelect() {
      const num = -1;
      const api = `http://${this.domain}.upis.info/Api/Dept/GetSelect/${num}`;
      this.$http.get(api).then((res) => {
        this.selectList = res.data.content.list;
      });
    },
    previousPage() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getSelect();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
