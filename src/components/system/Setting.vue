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
    <el-row class="main" v-if="JSON.stringify(data) !== '{}'">
      <p>基本設定</p>
      <div class="main-item">
        <div class="item-row">
          <p class="row-p">指紋機</p>
          <el-switch active-color="#0b7dd1" inactive-color="#ccc" v-model="data.fingerPrint.value"></el-switch>
        </div>
        <div class="item-row">
          <p class="row-p">背景圖</p>
          <label class="el-button el-button--primary el-button--small">
            <input type="file" size="small" class="d-none" @change="uploadFile">
            選擇檔案
          </label>
        </div>
        <div class="item-row" v-if="src !== ''">
          <img :src="src" class="row-img">
        </div>
        <div class="item-row">
          <p class="row-p">官方橫幅圖</p>
          <label class="el-button el-button--primary el-button--small">
            <input type="file" size="small" class="d-none" @change="uploadFile">
            選擇檔案
          </label>
        </div>
        <div class="item-row" v-if="src !== ''">
          <img :src="src" class="row-img">
        </div>
        <div class="item-row">
          <p class="row-p mb-auto">官網商標</p>
          <img :src="item" class="multiple-img" v-for="(item, index) in temp" :key="index" alt>
          <label class="el-upload el-upload--picture-card">
            <input type="file" size="small" class="d-none" @change="uploadFiles" multiple>
            <i class="el-icon-plus"></i>
          </label>
        </div>
        <div class="item-row">
          <p class="row-p mb-auto">贊助商</p>
          <img :src="item" class="multiple-img" v-for="(item, index) in temp" :key="index" alt>
          <label class="el-upload el-upload--picture-card">
            <input type="file" size="small" class="d-none" @change="uploadFiles" multiple>
            <i class="el-icon-plus"></i>
          </label>
        </div>
        <div class="item-row">
          <p class="row-p">看診時段</p>
          <p>早上</p>
          <el-time-select
            class="row-time-picker"
            :picker-options="pickerSetting"
            placeholder="起始時間"
            v-model="data.morningShiftStart.value"
          ></el-time-select>
          <el-time-select
            class="row-time-picker"
            :picker-options="pickerSetting"
            placeholder="結束時間"
            v-model="data.morningShiftEnd.value"
          ></el-time-select>
        </div>
        <div class="item-row">
          <p class="row-p"></p>
          <p>下午</p>
          <el-time-select
            class="row-time-picker"
            :picker-options="pickerSetting"
            placeholder="起始時間"
            v-model="data.afternoonShiftStart.value"
          ></el-time-select>
          <el-time-select
            class="row-time-picker"
            :picker-options="pickerSetting"
            placeholder="結束時間"
            v-model="data.afternoonShiftEnd.value"
          ></el-time-select>
        </div>
        <div class="item-row">
          <p class="row-p"></p>
          <p>夜間</p>
          <el-time-select
            class="row-time-picker"
            :picker-options="pickerSetting"
            placeholder="起始時間"
            v-model="data.eveningShiftStart.value"
          ></el-time-select>
          <el-time-select
            class="row-time-picker"
            :picker-options="pickerSetting"
            placeholder="結束時間"
            v-model="data.eveningShiftEnd.value"
          ></el-time-select>
        </div>
      </div>
      <p>郵件設定</p>
      <div class="main-item">
        <div class="item-row">
          <p class="row-p">登入帳號</p>
          <el-input class="row-input" v-model="data.mailUserName.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">登入密碼</p>
          <el-input class="row-input" v-model="data.mailUserPassword.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">埠</p>
          <el-input class="row-input" v-model="data.mailPort.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">郵件主機網址</p>
          <el-input class="row-input" v-model="data.mailUrl.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">聯絡人郵件</p>
          <el-input class="row-input" v-model="data.mailContactMail.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">聯絡人副本郵件</p>
          <el-input class="row-input" v-model="data.mailContactBccMail.value"></el-input>
        </div>
      </div>
      <p>醫院簡介</p>
      <div class="main-item">
        <div class="item-row">
          <p class="row-p">醫院編號</p>
          <p>{{ data.hospitalNo }}</p>
        </div>
        <div class="item-row">
          <p class="row-p">醫院名稱</p>
          <el-input class="row-input" v-model="data.hospitalName.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">醫院電話</p>
          <el-input class="row-input" v-model="data.hospitalTel.value"></el-input>
        </div>
        <!-- Google Maps -->
        <div class="item-row">
          <p class="row-p">醫院地址</p>
          <label>
            <gmap-autocomplete
              class="row-input el-input__inner"
              @place_changed="setPlace"
              @keyup.enter="addMarker"
            ></gmap-autocomplete>
          </label>
        </div>
        <div class="item-row">
          <gmap-map class="gmap-area" :zoom="15" :center="center">
            <gmap-marker
              :key="index"
              :position="m.position"
              @click="center = m.position"
              v-for="(m, index) in markers"
            ></gmap-marker>
          </gmap-map>
        </div>
        <!-- Google Maps -->
        <div class="item-row">
          <p class="row-p">聯絡人姓名</p>
          <el-input class="row-input" v-model="data.hospitalContactName.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">聯絡人電話</p>
          <el-input class="row-input" v-model="data.hospitalContactTel.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">口號</p>
          <el-input class="row-input" v-model="data.hospitalSlogan.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p mb-auto">醫院環境</p>
          <img :src="item" class="multiple-img" v-for="(item, index) in temp" :key="index" alt>
          <label class="el-upload el-upload--picture-card">
            <input type="file" size="small" class="d-none" @change="uploadFiles" multiple>
            <i class="el-icon-plus"></i>
          </label>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      src: '',
      temp: [],
      pickerSetting: {
        start: '00:00',
        step: '00:15',
        end: '23:45',
      },
      /* Google Maps */
      places: [],
      markers: [],
      currentPlace: null,
      center: { lat: 45.5, lng: -73.5 },
      /* Google Maps */
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getList() {
      const api = `http://${this.domain}.upis.info/Api/Setting/List`;
      this.$store.commit('LOADING', true);
      this.$http.get(api).then((res) => {
        const r = res.data.content;
        this.data = r;
        this.$store.commit('LOADING', false);
      });
    },
    uploadFile() {
      const { files } = window.event.target;
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.src = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      window.event.target.value = '';
    },
    uploadFiles() {
      const { files } = window.event.target;
      for (let i = 0; i < files.length; i += 1) {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          this.temp.push(fileReader.result);
        });
        fileReader.readAsDataURL(files[i]);
      }
      window.event.target.value = '';
    },
    /* Google Maps */
    setPlace(place) {
      this.currentPlace = place;
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    addMarker() {
      const vm = this;
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.data.hospitalAddress.value = this.currentPlace.formatted_address;
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
        vm.data.lat.value = marker.lat;
        vm.data.lng.value = marker.lng;
      }
    },
    /* Google Maps */
  },
  created() {
    const token = localStorage.getItem('cookie');
    this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.$store.commit('DOMAIN');
    this.getList();
    this.geolocate();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/components/system/setting.scss";
</style>
