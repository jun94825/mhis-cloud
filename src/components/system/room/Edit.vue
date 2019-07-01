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
          <el-input v-model="data.roomName"></el-input>
        </div>
        <div class="inside-item">
          <p>Remark</p>
          <el-input :disabled="true"></el-input>
        </div>
        <div class="inside-item">
          <p>Allow Dept.</p>
          <el-cascader
            v-model="test2"
            placeholder="請選擇"
            :options="allowDeptOptions"
            :show-all-levels="false"
            :props="{ multiple: true, expandTrigger: 'hover' }"
            @change="handleChange"
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
      canBeRegister: -1,
      allowDeptSelect: [],
      allowDeptOptions: [],
      // test: [['Taipei', 'Banciao'], ['Kaohsiung', 'Nanzih']],
      test2: [],
      test3: [],
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
          /* find same */
          res.data.content.selectedDepts.forEach((item) => {
            item.children.forEach((i) => {
              this.allowDeptSelect.push(i);
            });
          });
          this.getOptions();
        }
      });
    },
    getOptions() {
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
          this.allowDeptOptions = r;
          /* find same step 1 */
          this.data.selectedDepts.forEach((item) => {
            this.allowDeptOptions.forEach((i) => {
              if (item.id === i.id) {
                for (let x = 0; x < item.children.length; x += 1) {
                  this.test2.push([i.label]);
                }
              }
            });
          });
          /* find same step 2 */
          this.allowDeptSelect.forEach((item) => {
            this.allowDeptOptions.forEach((value) => {
              value.children.forEach((v) => {
                if (item === v.id) {
                  this.test3.push(v.label);
                }
              });
            });
          });
          /* find same step 3 */
          this.test2.forEach((item, index) => {
            item.push(this.test3[index]);
          });
          this.$store.commit('LOADING', false);
        }
      });
    },
    edit() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Room/Edit`;
      /* 重整資料結構 */
      delete this.data.depts;
      delete this.data.roomNo;
      delete this.data.selectedDepts;
      this.data.depts = this.allowDeptSelect;
      /* 重整資料結構 */
      const dataJS = JSON.stringify(this.data);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success) {
          this.$store.commit('LOADING', false);
          this.$router.push({ name: 'Room' });
        }
      });
    },
    handleChange(array) {
      this.allowDeptSelect = [];
      this.data.selectedDepts = [];
      array.forEach((item) => {
        this.data.selectedDepts.push(item[1]);
      });
      this.allowDeptOptions.forEach((item) => {
        item.children.forEach((i) => {
          this.data.selectedDepts.forEach((value) => {
            if (value === i.label) {
              this.allowDeptSelect.push(i.id);
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
