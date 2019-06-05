<template>
  <div>
    <el-row class="sys-header">
      <p>角色維護</p>
    </el-row>
    <el-row class="form">
      <div class="form-inside">
        <el-button type="primary" size="small">新增</el-button>
        <el-row class="form-header">
          <p>角色名稱</p>
        </el-row>
        <el-row type="flex" align="middle" justify="space-between" class="roles">
          <p>醫生</p>
          <div>
            <i class="el-icon-edit-outline"></i>
            <i class="el-icon-delete"></i>
          </div>
        </el-row>
        <el-row type="flex" align="middle" justify="space-between" class="roles">
          <p>護理師</p>
          <div>
            <i class="el-icon-edit-outline"></i>
            <i class="el-icon-delete"></i>
          </div>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
@import "../../../assets/styles/components/system/role/maintain.scss";
</style>
