<template>
  <div>
    <el-row type="flex" align="middle" justify="space-between" class="title">
      <p>系統設定</p>
      <el-button type="primary" size="small" @click="checkRmove">儲存變更</el-button>
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
            <input type="file" size="small" class="d-none" @change="singleFile('backgroundImage')">
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
            <input
              type="file"
              size="small"
              class="d-none"
              @change="singleFile('officialBannerImg')"
            >
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
          <label
            class="el-button el-button--primary el-button--small"
            @click="multipleFiles('partners')"
          >
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
            <input
              type="file"
              size="small"
              class="d-none"
              @change="multipleFiles('partners')"
              multiple
            >
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
          <p style="margin-left: 1rem;">至</p>
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
          <p style="margin-left: 1rem;">至</p>
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
          <p style="margin-left: 1rem;">至</p>
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
          <p>{{ data.hospitalAddress.value }}</p>
        </div>
        <div class="item-row">
          <label class="ml-160">
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
            <input
              type="file"
              size="small"
              class="d-none"
              @change="multipleFiles('hospitalEnvironmentPhotos')"
              multiple
            >
            <i class="el-icon-plus"></i>
          </label>
        </div>
      </div>
      <i class="el-icon-upload2" @click="scroll('goTop')"></i>
    </el-row>
  </div>
</template>

<script>
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      data: {},
      /* About Images */
      backgroundImage: {
        id: '',
        data: null,
      },
      officialBannerImg: {
        id: '',
        data: null,
      },
      partners: {
        id: [],
        data: [],
      },
      hospitalEnvironmentPhotos: {
        id: [],
        data: [],
      },
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
    getList(bol = false) {
      const api = `http://${this.domain}.upis.info/Api/Setting/List`;
      this.$store.commit('LOADING', true);
      this.$http.get(api)
        .then((res) => {
          if (res.data.success === true) {
            const r = res.data.content;
            this.data = r;
            this.center.lat = r.lat.value;
            this.center.lng = r.lng.value;
            this.$store.commit('LOADING', false);
            if (bol) {
              this.$message({
                type: 'success',
                center: true,
                message: '儲存成功',
              });
            }
          }
        })
        .catch(() => {
          this.$store.commit('LOADING', false);
          this.$router.push({ name: '登入' });
          this.$message({
            type: 'warning',
            center: true,
            message: '離線逾時，請重新登入',
          });
        });
    },
    saveEdit() {
      const api = `http://${this.domain}.upis.info/Api/Setting/Edit`;
      this.$store.commit('LOADING', true);
      const data = {};
      const notRequire = ['backgroundImage', 'hospitalEnvironmentPhotos', 'hospitalNo', 'hospitalTimeZone', 'officialBannerImg', 'officialLogoImg', 'partners'];
      notRequire.forEach((item) => {
        delete this.data[item];
      });
      const require = Object.keys(this.data);
      require.forEach((item) => {
        data[item] = this.data[item].value;
      });
      const dataJS = JSON.stringify(data);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success === true) {
          setTimeout(() => {
            this.getList(true);
          }, 1500);
        }
      });
    },
    /* About Images */
    singleFile(target) {
      const { files } = window.event.target;
      const fr = new FileReader();
      const fd = new FormData();
      fd.append('uploadedFiles', files[0]);
      fr.addEventListener('load', () => {
        this.data[target].value = {
          id: `${this.randomNumber()}`,
          mimeType: '',
          url: fr.result,
        };
        this[target].data = fd;
      });
      fr.readAsDataURL(files[0]);
      window.event.target.value = '';
    },
    multipleFiles(target) {
      const { files } = window.event.target;
      for (let i = 0; i < files.length; i += 1) {
        const fr = new FileReader();
        this[target].data.push(files[i]); // test
        fr.addEventListener('load', () => {
          this.data[target].values.push({
            id: `${this.randomNumber()}`,
            mimeType: '',
            url: fr.result,
          });
        });
        fr.readAsDataURL(files[i]);
      }
      window.event.target.value = '';
    },
    checkUpload() {
      const single = ['backgroundImage', 'officialBannerImg'];
      single.forEach((item) => {
        if (this[item].data !== null) {
          this.upload(item, this[item].data);
          this[item].data = null;
        }
      });
      const multiple = ['partners', 'hospitalEnvironmentPhotos'];
      multiple.forEach((item) => {
        if (this[item].data.length !== 0) {
          this[item].data.forEach((i) => {
            const fd = new FormData();
            fd.append('uploadedFiles', i);
            this.upload(item, fd);
          });
          this[item].data = [];
        }
      });
      this.saveEdit();
    },
    upload(target, data) {
      const api = `http://${this.domain}.upis.info/Api/Setting/Upload/${target}`;
      this.$http.post(api, data).then((res) => {
        if (res.data.success === false) {
          alert('Error!');
        }
      });
    },
    checkRmove() {
      const single = ['backgroundImage', 'officialBannerImg'];
      single.forEach((item) => {
        if (this[item].id !== '' && this[item].id.length > 8) {
          this.remove(this[item].id);
          this[item].id = '';
        }
      });
      const multiple = ['partners', 'hospitalEnvironmentPhotos'];
      multiple.forEach((item) => {
        if (this[item].id.length !== 0) {
          this[item].id.forEach((i) => {
            this.remove(i);
          });
          this[item].id = [];
        }
      });
      this.checkUpload();
    },
    remove(id) {
      const api = `http://${this.domain}.upis.info/Api/Setting/Remove`;
      const data = {
        ids: [id],
      };
      const dataJS = JSON.stringify(data);
      this.$http.post(api, dataJS).then((res) => {
        if (res.data.success === false) {
          alert('Error!');
        }
      });
    },
    switchDeleteBg(id) {
      const t = document.getElementById(id);
      if (t.style.display === 'none') {
        t.style.display = 'block';
      } else {
        t.style.display = 'none';
      }
    },
    removeLocalImg(key, index) {
      if (index === undefined) {
        this[key].id = this.data[key].value.id;
        this.data[key].value = null;
      } else {
        this[key].id.push(this.data[key].values[index].id);
        this.data[key].values.splice(index, 1);
      }
    },
    randomNumber() {
      const list = [];
      for (let i = 0; i < 8; i += 1) {
        list.push(Math.floor(Math.random() * 10));
      }
      const randomResult = list.join('');
      this.data.key = randomResult;
      return randomResult;
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
