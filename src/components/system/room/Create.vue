<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="previousPage"></i>
      <p>{{ $t('createRoom') }}</p>
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
          <el-cascader
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
        depts: [],
        roomNo: '',
        roomName: '',
        status: false,
      },
      select: [],
      selectList: [],
      canBeRegister: -1,
      deptOptions: [],
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getSelect() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Dept/GetSelect/${this.canBeRegister}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.selectList = res.data.content.list;
          this.$store.commit('LOADING', false);
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
        }
      });
    },
    create() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/Room/Create`;
      const dataJS = JSON.stringify(this.data);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success) {
          this.$message({ type: 'success', center: true, message: '新增成功' });
          this.$router.push({ name: 'Room' });
        }
      });
    },
    handleChange(array) {
      this.data.depts = [];
      this.deptOptions.forEach((item) => {
        item.children.forEach((i) => {
          array.forEach((value) => {
            if (i.label === value[1]) {
              this.data.depts.push(i.id);
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
    this.getSelect();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
