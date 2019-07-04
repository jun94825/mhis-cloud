<template>
  <h1>Test Promise ...</h1>
</template>


<script>
export default {
  data() {
    return {
      arr: ['jun', 'cloud', '003'],
    };
  },
  methods: {
    async callAllApi(arr) {
      const promiseList = arr.map(this.callSingalApi);
      await Promise.all(promiseList).then((res) => {
        console.log(res);
      });
      console.log('All done!');
    },
    async callSingalApi(item) {
      const api = `http://${item}.upis.info/Api/Login/Info`;
      const res = await this.$http.get(api);
      return res;
    },
  },
  created() {
    this.$store.commit('VERIFY');
    this.callAllApi(this.arr);
  },
};

// export default {
//   data() {
//     return {
//       arr: ['jun', 'cloud', '003'],
//     };
//   },
//   methods: {
//     callApi(item) {
//       const api = `http://${item}.upis.info/Api/Login/Info`;
//       return this.$http.get(api);
//     },
//     async callSingalApi(item) {
//       const res = await this.callApi(item);
//       console.log(res);
//       // console.log(item);
//     },
//     async callAllApi(arr) {
//       const promises = arr.map(this.callSingalApi);
//       await Promise.all(promises);
//       console.log('done');
//     },
//   },
//   created() {
//     this.$store.commit('VERIFY');
//     this.callAllApi(this.arr);
//   },
// };
</script>
