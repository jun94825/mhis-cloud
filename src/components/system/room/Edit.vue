<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="previousPage"></i>
      <p>{{ $t('editRoom') }}</p>
    </el-row>
    <div class="form">
      <div class="form-inside">
        <div class="inside-item">
          <p class="required">Room No</p>
          <el-tag>{{ data.roomNo }}</el-tag>
        </div>
        <div class="inside-item">
          <p class="required">Room Name</p>
          <el-input v-model="data.roomName"></el-input>
        </div>
        <div class="inside-item">
          <p>Remark</p>
          <el-input :disabled="true"></el-input>
        </div>
        <div class="inside-item">
          <p>Allow Dept.</p>
          <el-cascader
            v-model="reverseBinding"
            :placeholder="$t('select')"
            :options="deptOptions"
            :show-all-levels="false"
            :props="{ multiple: true, expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </div>
        <div class="inside-item">
          <el-checkbox v-model="data.status">Status</el-checkbox>
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
      canBeRegister: -1,
      deptOptions: [],
      deptSelected: [],
      reverseBinding: [],
      // test3: [],
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
          this.data.selectedDepts.forEach((item) => {
            item.children.forEach((i) => {
              this.deptSelected.push(i);
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
          this.deptOptions = r;
          /* 利用 id 尋找相同父項目，若有即取出 label */
          this.data.selectedDepts.forEach((item) => {
            this.deptOptions.forEach((i) => {
              if (item.id === i.id) {
                for (let x = 0; x < item.children.length; x += 1) {
                  this.reverseBinding.push([i.label]);
                }
              }
            });
          });
          /* 利用 id 尋找相同子項目，若有即取出 label */
          const children = [];
          this.deptSelected.forEach((item) => {
            this.deptOptions.forEach((value) => {
              value.children.forEach((v) => {
                if (item === v.id) {
                  children.push(v.label);
                }
              });
            });
          });
          /* 將兩者合併 */
          this.reverseBinding.forEach((item, index) => {
            item.push(children[index]);
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
      this.data.depts = this.deptSelected;
      /* 重整資料結構 */
      const dataJS = JSON.stringify(this.data);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success) {
          this.$message({ type: 'success', center: true, message: '修改成功' });
          this.$router.push({ name: 'Room' });
        }
      });
    },
    handleChange(array) {
      this.deptSelected = [];
      this.data.selectedDepts = [];
      array.forEach((item) => {
        this.data.selectedDepts.push(item[1]);
      });
      this.deptOptions.forEach((item) => {
        item.children.forEach((i) => {
          this.data.selectedDepts.forEach((value) => {
            if (value === i.label) {
              this.deptSelected.push(i.id);
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
