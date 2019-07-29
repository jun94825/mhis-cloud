<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle">
      <i class="el-icon-back" @click="previousPage"></i>
      <p>{{ $t("HealthEducation") }}</p>
    </el-row>
    <div class="sys-main">
      <div class="main-inside">
        <div class="inside-item">
          <p>Health Edu Name</p>
          <el-input v-model="data.name"></el-input>
        </div>
        <div class="inside-item">
          <p>Queue Message</p>
          <el-input v-model="data.queueMessage"></el-input>
        </div>
        <div class="inside-item">
          <el-checkbox v-model="data.isEnable">Enable</el-checkbox>
        </div>
        <div class="inside-item">
          <el-checkbox v-model="data.lobbyUse">Use in lobby</el-checkbox>
        </div>
        <div class="inside-item">
          <label
            class="el-button el-button--primary el-button--small"
            @change="selectFile"
          >
            <input type="file" size="small" class="d-none" />
            {{ $t("select") }}
          </label>
        </div>
        <el-button type="success" size="small" @click="edit">{{
          $t("confirm")
        }}</el-button>
      </div>
    </div>
    <pre style="margin-left: 1.5rem;">{{ data }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getCurrentHealthEdu() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/HealthEdu/Edit/${this.id}`;
      this.$http.get(api).then((res) => {
        this.data = res.data.content;
        this.$store.commit('LOADING', false);
      });
    },
    edit() {
      this.$store.commit('LOADING', true);
      const api = `http://${this.domain}.upis.info/Api/HealthEdu/Edit`;
      const dataJS = JSON.stringify(this.data);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            center: 'center',
            message: '編輯成功!',
          });
          this.$router.push({ name: 'HealthEducation' });
        }
      });
    },
    selectFile() {
      const { files } = window.event.target;
      const fd = new FormData();
      const arr = [
        {
          sec: 5,
          seq: 1,
          isEnable: true,
          file: files[0],
        },
      ];

      const sss = JSON.stringify(arr);
      console.log(sss);
      fd.append('healthEducationID', this.data.id);
      fd.append('filesAndSettings', sss);

      console.log(typeof this.data.id);
      // for (let i = 0; i < arr.length; i += 1) {
      //   console.log(arr[i]);
      //   fd.append('filesAndSettings', arr[i]);
      // }

      // filesAndSettings.forEach((item, index, array) => {
      //   console.log(array[index]);
      //   fd.append('filesAndSettings', array[index]);
      // });

      // fd.append('file', files[0]);
      // const upload = {
      //   healthEducationID: this.data.id,
      //   filesAndSettings: [
      //     {
      //       file: fd,
      //       isEnable: true,
      //       seq: 1,
      //       sec: 5,
      //     },
      //   ],
      // };

      const api = `http://${this.domain}.upis.info/Api/HealthEduFile/Upload`;
      this.$http.post(api, fd).then((res) => {
        console.log(res);
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
    this.getCurrentHealthEdu();
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";
</style>
