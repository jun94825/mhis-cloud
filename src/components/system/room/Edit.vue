<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="previousPage"></i>
      <p>編輯診間</p>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <div class="inside-item">
          <p>Room No</p>
          <el-tag>{{ data.roomNo }}</el-tag>
        </div>
        <div class="inside-item">
          <p>Room Name</p>
          <el-input v-model="data.desc" :placeholder="data.roomName"></el-input>
        </div>
        <div class="inside-item">
          <p>Remark</p>
          <el-input :disabled="true"></el-input>
        </div>
        <div class="inside-item">
          <p>Allow Dept.</p>
          <el-cascader
            :options="selectList"
            :show-all-levels="false"
            :props="{ multiple: true, expandTrigger: 'hover' }"
            @change="handleChange"
            placeholder="請選擇"
          ></el-cascader>
        </div>
        <el-button type="primary" size="small" @click="edit">修改</el-button>
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
      selectList: [],
      canBeRegister: -1,
      // test: [['Taipei', 'Banciao']],
      test2: [],
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getCurrentRoom() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Room/Edit/${this.id}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.data = res.data.content;
          this.getSelect();
        }
      });
    },
    getSelect() {
      const api = `http://${this.domain}.upis.info/Api/Dept/GetSelect/${this.canBeRegister}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          const r = res.data.content.list;
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
          this.selectList = r;
          this.$store.commit('LOADING', false);
        }
      });
    },
    edit() {
      this.data.remark = '123';
      delete this.data.depts;
      delete this.data.roomNo;
      delete this.data.selectedDepts;
      this.data.depts = this.test2;
      /* 以上為整理資料結構用 */
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Room/Edit`;
      const dataJS = JSON.stringify(this.data);
      console.log(dataJS);
      this.$http.post(api, dataJS).then((res) => {
        console.log(res);
        this.$store.commit('LOADING', false);
      });
    },
    handleChange(array) {
      this.test2 = [];
      this.data.selectedDepts = [];
      array.forEach((item) => {
        this.data.selectedDepts.push(item[1]);
      });
      this.selectList.forEach((item) => {
        item.children.forEach((i) => {
          this.data.selectedDepts.forEach((value) => {
            if (value === i.label) {
              this.test2.push(i.id);
            }
          });
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
    this.getCurrentRoom();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
