<template>
  <div>
    <el-row type="flex" align="middle" justify="space-between" class="title">
      <p>系統設定</p>
      <el-button type="primary" size="small">儲存變更</el-button>
    </el-row>
    <el-row type="flex" align="middle" class="slide">
      <a href="javascript:;" @click="scroll(0)">基本設定</a>
      <a href="javascript:;" @click="scroll(1)">郵件設定</a>
      <a href="javascript:;" @click="scroll(2)">醫院簡介</a>
    </el-row>
    <el-row class="main" v-if="JSON.stringify(data) !== '{}'">
      <p class="mark">基本設定</p>
      <div class="main-item">
        <div class="item-row">
          <p class="row-p">指紋機</p>
          <el-switch active-color="#0b7dd1" inactive-color="#ccc" v-model="data.fingerPrint.value"></el-switch>
        </div>
        <div class="item-row">
          <p class="row-p">背景圖</p>
          <label class="el-button el-button--primary el-button--small">
            <input type="file" size="small" class="d-none" @change="singleFile">
            選擇檔案
          </label>
        </div>
        <div class="item-row" v-if="data.backgroundImage.value !== null">
          <div
            class="single-img-area p-rel"
            @mouseenter="switchDeleteBg('bgImg')"
            @mouseleave="switchDeleteBg('bgImg')"
          >
            <img :src="data.backgroundImage.value.url" alt>
            <div id="bgImg" class="remove" style="display: none;">
              <i class="el-icon-delete" @click="removeLocalImg('backgroundImage')"></i>
            </div>
          </div>
        </div>
        <div class="item-row">
          <p class="row-p">官方橫幅圖</p>
          <label class="el-button el-button--primary el-button--small">
            <input type="file" size="small" class="d-none" @change="singleFile">
            選擇檔案
          </label>
        </div>
        <div class="item-row" v-if="data.officialBannerImg.value !== null">
          <div
            class="single-img-area p-rel"
            @mouseenter="switchDeleteBg('obImg')"
            @mouseleave="switchDeleteBg('obImg')"
          >
            <img :src="data.officialBannerImg.value.url" alt>
            <div id="obImg" class="remove" style="display: none;">
              <i class="el-icon-delete" @click="removeLocalImg('officialBannerImg')"></i>
            </div>
          </div>
        </div>
        <div class="item-row">
          <p class="row-p mb-auto">官網商標</p>
          <label class="el-button el-button--primary el-button--small">
            <input type="file" size="small" class="d-none">
            選擇檔案
          </label>
        </div>
        <div class="item-row">
          <p class="row-p mb-auto">贊助商</p>
          <div v-for="(item, index) in data.partners.values" :key="index">
            <div
              class="multiple-img p-rel"
              @mouseenter="switchDeleteBg(item.id)"
              @mouseleave="switchDeleteBg(item.id)"
            >
              <img :src="item.url" alt>
              <div :id="item.id" class="remove" style="display: none;">
                <i class="el-icon-delete" @click="removeLocalImg('partners', index)"></i>
              </div>
            </div>
          </div>
          <label class="el-upload el-upload--picture-card">
            <input type="file" size="small" class="d-none" @change="multipleFiles" multiple>
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
      <p class="mark">郵件設定</p>
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
      <p class="mark">醫院簡介</p>
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
          <div v-for="(item, index) in data.hospitalEnvironmentPhotos.values" :key="index">
            <div
              class="multiple-img p-rel"
              @mouseenter="switchDeleteBg(item.id)"
              @mouseleave="switchDeleteBg(item.id)"
            >
              <img :src="item.url" alt>
              <div :id="item.id" class="remove" style="display: none;">
                <i
                  class="el-icon-delete"
                  @click="removeLocalImg('hospitalEnvironmentPhotos', index)"
                ></i>
              </div>
            </div>
          </div>
          <label class="el-upload el-upload--picture-card">
            <input type="file" size="small" class="d-none" @change="multipleFiles" multiple>
            <i class="el-icon-plus"></i>
          </label>
        </div>
      </div>
      <i class="el-icon-upload2" @click="scroll('goTop')"></i>
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
      /* Time Picker */
      pickerSetting: {
        start: '00:00',
        step: '00:15',
        end: '23:45',
      },
      /* Scroll */
      scrollY: null,
      /* Google Maps */
      places: [],
      markers: [],
      currentPlace: null,
      center: { lat: 45.5, lng: -73.5 },
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
    /* Image */
    singleFile() {
      const { files } = window.event.target;
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.src = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      const data = new FormData();
      data.append('uploadedFiles', files[0]);
      this.upload('backgroundImage', data);
      window.event.target.value = '';
    },
    multipleFiles() {
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
    upload(key, data) {
      const api = `http://${this.domain}.upis.info/Api/Setting/Upload/${key}`;
      this.$http.post(api, data).then((res) => {
        if (res.data.success === true) {
          this.getList();
        }
      });
    },
    /* 切換顯示垃圾桶的半透明背景 */
    switchDeleteBg(id) {
      const t = document.getElementById(id);
      if (t.style.display === 'none') {
        t.style.display = 'block';
      } else {
        t.style.display = 'none';
      }
    },
    /* 刪除緩存的圖片 */
    removeLocalImg(key, index) {
      if (index === undefined) {
        this.data[key].value = null;
      } else {
        this.data[key].values.splice(index, 1);
      }
    },
    /* Scroll */
    scroll(index) {
      const marks = document.getElementsByClassName('mark');
      if (index === 'goTop') {
        this.scrollY = -48;
      } else {
        this.scrollY = marks[index].offsetTop + 205;
      }
    },
    render() {
      if (this.scrollY !== null) {
        const move = (this.scrollY - window.scrollY) * 0.05;
        window.scrollTo(0, window.scrollY + move);
        if (Math.abs(this.scrollY - window.scrollY) < 50) this.scrollY = null;
      }
      requestAnimationFrame(this.render);
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
  },
  created() {
    const token = localStorage.getItem('cookie');
    this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.$store.commit('DOMAIN');
    this.getList();
    this.geolocate();
    this.render();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/components/system/setting.scss";
</style>
