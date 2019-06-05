<template>
  <el-menu
    router
    default-active="1"
    class="menu"
    @open="handleOpen"
    @close="handleClose"
    :collapse="collapse"
    background-color="#333"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">
      <i class="el-icon-s-home"></i>
      <span>首頁</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-microphone"></i>
        <span>語言</span>
      </template>
      <el-menu-item index="2-1">繁體中文</el-menu-item>
      <el-menu-item index="2-2">English</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>系統</span>
      </template>
      <el-menu-item index="3-1">院內消息</el-menu-item>
      <el-menu-item index="3-2">醫生排班</el-menu-item>
      <el-menu-item index="3-3" :route="{ name: '角色維護' }">角色維護</el-menu-item>
      <el-menu-item index="3-4">使用者維護</el-menu-item>
      <el-menu-item index="3-5">診間維護</el-menu-item>
      <el-menu-item index="3-6">科別</el-menu-item>
      <el-menu-item index="3-7">分類設定</el-menu-item>
      <el-menu-item index="3-8">衛教宣導</el-menu-item>
      <el-menu-item index="3-9">項目管理</el-menu-item>
      <el-menu-item index="3-10" :route="{ name: '系統設定' }">系統設定</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    collapse() {
      return this.$store.state.collapse;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/components/sidebar.scss";
</style>
