<template>
  <el-menu
    router
    class="menu"
    default-active="1"
    @open="handleOpen"
    @close="handleClose"
    :collapse="collapse"
    text-color="#fff"
    background-color="#333"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1" :route="{ name: 'Home' }">
      <i class="el-icon-s-home"></i>
      <span>{{ $t('home') }}</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-chat-dot-round"></i>
        <span>{{ $t('language') }}</span>
      </template>
      <el-menu-item @click="changeLanguage('us')">English</el-menu-item>
      <el-menu-item @click="changeLanguage('tw')">繁體中文</el-menu-item>
    </el-submenu>
    <el-submenu v-for="(item, index) in menu" :key="index" :index="`${index + 3}`">
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ $t(item.groupName) }}</span>
      </template>
      <el-menu-item
        v-for="(v, i) in item.pages"
        :key="i"
        :index="`${index + 3} - ${i + 1}`"
        :route="{ name: `${v.pageName}` }"
      >{{ $t(v.pageName) }}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [],
    };
  },
  computed: {
    collapse() {
      return this.$store.state.collapse;
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    getLanguage() {
      const lsLanguage = localStorage.getItem('language');
      const language = lsLanguage === null || lsLanguage === 'tw' ? 'tw' : 'us';
      this.$store.commit('LANGUAGE', language);
    },
    changeLanguage(lang) {
      window.event.preventDefault();
      this.$store.commit('LANGUAGE', lang);
      localStorage.setItem('language', lang);
    },
  },
  created() {
    this.getLanguage();
    this.menu = JSON.parse(localStorage.getItem('menuGrp'));
    this.menu.forEach((item) => {
      const i = item;
      if (item.groupName === 'Patient') {
        i.icon = 'el-icon-user';
      } else if (item.groupName === 'Pharmacy') {
        i.icon = 'el-icon-first-aid-kit';
      } else if (item.groupName === 'Maintenance') {
        i.icon = 'el-icon-setting';
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/helpers.scss";

.menu {
  border-right: unset;

  &:not(.el-menu--collapse) {
    width: 12.5rem;
  }
}
</style>
