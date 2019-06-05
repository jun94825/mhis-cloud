<template>
  <div>
    <el-row type="flex" align="middle" justify="space-between" class="title">
      <p>系統設定</p>
      <el-button type="primary" size="small">儲存變更</el-button>
    </el-row>
    <el-row type="flex" align="middle" class="slide">
      <p>基本設定</p>
      <p>郵件設定</p>
      <p>醫院簡介</p>
    </el-row>
    <el-row class="main">
      <p>基本設定</p>
      <div class="main-item">
        <div class="item-row">
          <p class="row-p">指紋機</p>
          <el-switch v-model="value" active-color="#0b7dd1" inactive-color="#ccc"></el-switch>
        </div>
        <div class="item-row">
          <p class="row-p">背景圖</p>
          <el-button type="primary" size="small">選擇檔案</el-button>
        </div>
        <div class="item-row">
          <el-image :src="src" class="row-img"></el-image>
        </div>
        <div class="item-row">
          <p class="row-p">官方橫幅圖</p>
          <el-button type="primary" size="small">選擇檔案</el-button>
        </div>
        <div class="item-row">
          <el-image :src="src" class="row-img"></el-image>
        </div>
        <div class="item-row">
          <p class="row-p mb-auto">官網商標</p>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </div>
        <div class="item-row">
          <p class="row-p mb-auto">贊助商</p>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </div>
        <div class="item-row">
          <p class="row-p">看診時段</p>
          <p>早上</p>
          <el-time-select
            placeholder="起始時間"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:45'
            }"
            class="row-time-picker"
          ></el-time-select>
          <el-time-select
            placeholder="結束時間"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:45',
            }"
            class="row-time-picker"
          ></el-time-select>
        </div>
        <div class="item-row">
          <p class="row-p"></p>
          <p>下午</p>
          <el-time-select
            placeholder="起始時間"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:45'
            }"
            class="row-time-picker"
          ></el-time-select>
          <el-time-select
            placeholder="結束時間"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:45',
            }"
            class="row-time-picker"
          ></el-time-select>
        </div>
        <div class="item-row">
          <p class="row-p"></p>
          <p>夜間</p>
          <el-time-select
            placeholder="起始時間"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:45'
            }"
            class="row-time-picker"
          ></el-time-select>
          <el-time-select
            placeholder="結束時間"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:45',
            }"
            class="row-time-picker"
          ></el-time-select>
        </div>
      </div>

      <p>郵件設定</p>
      <div class="main-item">
        <div class="item-row">
          <p class="row-p">登入帳號</p>
          <el-input class="row-input"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">登入密碼</p>
          <el-input class="row-input"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">埠</p>
          <el-input class="row-input"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">郵件主機網址</p>
          <el-input class="row-input"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">聯絡人郵件</p>
          <el-input class="row-input"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">聯絡人副本郵件</p>
          <el-input class="row-input"></el-input>
        </div>
      </div>
      <p>醫院簡介</p>
      <div class="main-item">
        <div class="item-row">
          <p class="row-p">醫院編號</p>
          <p>M256</p>
        </div>
        <div class="item-row">
          <p class="row-p">醫院名稱</p>
          <el-input class="row-input"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">醫院電話</p>
          <el-input class="row-input"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">醫院地址</p>
          <el-input class="row-input"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">聯絡人姓名</p>
          <el-input class="row-input"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">聯絡人電話</p>
          <el-input class="row-input"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">口號</p>
          <el-input class="row-input"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p mb-auto">醫院環境</p>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false,
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      dialogImageUrl: '',
      dialogVisible: false,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../../assets/styles/components/system/setting.scss";
</style>
