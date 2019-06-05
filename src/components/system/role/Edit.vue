<template>
  <div>
    <el-row type="flex" align="middle" justify="space-between" class="sys-header">
      <el-row type="flex" align="middle">
        <i class="el-icon-back"></i>
        <p>編輯角色權限</p>
      </el-row>
      <el-button type="primary" size="small">儲存</el-button>
    </el-row>
    <el-row class="form">
      <div class="form-inside">
        <p>醫生</p>
        <el-row type="flex" align="middle" justify="space-between" class="form-header">
          <p>功能分類</p>
          <el-row type="flex" align="middle" justify="space-around">
            <p>新增</p>
            <p>刪除</p>
            <p>修改</p>
            <p>讀取</p>
          </el-row>
        </el-row>
        <div>
          <el-row type="flex" align="middle" class="category-title">
            <i class="el-icon-plus"></i>
            <p>系統</p>
          </el-row>
          <el-row type="flex" align="middle" justify="space-between" class="category-content">
            <el-checkbox>院內消息</el-checkbox>
            <el-row type="flex" align="middle" justify="space-around">
              <el-checkbox></el-checkbox>
              <el-checkbox></el-checkbox>
              <el-checkbox></el-checkbox>
              <el-checkbox></el-checkbox>
            </el-row>
          </el-row>
        </div>
      </div>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
@import "../../../assets/styles/components/system/role/sharing.scss";
</style>
