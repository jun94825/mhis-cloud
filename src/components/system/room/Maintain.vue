<template>
  <h1>Maintain</h1>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      search: {
        dept: null,
        keyword: '',
        orderBy: 'id',
        orderByDesc: true,
      },
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getList() {
      const api = `http://${this.domain}.upis.info/Api/Room/List/${this.currentPage}`;
      const dataJS = JSON.stringify(this.search);
      this.$http.post(api, dataJS)
        .then((res) => {
          console.log(res);
        });
    },
    create() {
      const api = `http://${this.domain}.upis.info/Api/Room/Create`;
      const data = {
        roomNo: '001',
        roomName: 'Hello World',
      };
      const dataJS = JSON.stringify(data);
      this.$http.post(api, dataJS)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.$store.commit('VERIFY');
    this.create();
  },
};
</script>
