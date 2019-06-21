<template>
  <div>
    <el-row type="flex" align="middle" justify="space-between" class="title">
      <p>{{ $t('Setting') }}</p>
      <el-button type="primary" size="small" @click="checkRmove">{{ $t('Save') }}</el-button>
    </el-row>
    <el-row type="flex" align="middle" class="slide">
      <a href="javascript:;" @click="scroll(0)">{{ $t('Setting') }}</a>
      <a href="javascript:;" @click="scroll(1)">{{ $t('MailSetting') }}</a>
      <a href="javascript:;" @click="scroll(2)">{{ $t('HosptialInformation') }}</a>
    </el-row>
    <el-row class="main" v-if="JSON.stringify(data) !== '{}'">
      <p class="mark">{{ $t('Setting') }}</p>
      <div class="main-item">
        <div class="item-row">
          <p class="row-p">{{ $t('FingerPrint') }}</p>
          <el-switch active-color="#0b7dd1" inactive-color="#ccc" v-model="data.fingerPrint.value"></el-switch>
        </div>
        <div class="item-row">
          <p class="row-p">{{ $t('BackgroundImage') }}</p>
          <label class="el-button el-button--primary el-button--small">
            <input type="file" size="small" class="d-none" @change="singleFile('backgroundImage')">
            {{ $t('Select') }}
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
          <p class="row-p">{{ $t('OfficialBannerImage') }}</p>
          <label class="el-button el-button--primary el-button--small">
            <input
              type="file"
              size="small"
              class="d-none"
              @change="singleFile('officialBannerImg')"
            >
            {{ $t('Select') }}
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
          <p class="row-p mb-auto">{{ $t('OfficialLogo') }}</p>
          <label
            class="el-button el-button--primary el-button--small"
            @click="multipleFiles('partners')"
          >
            <input type="file" size="small" class="d-none">
            {{ $t('Select') }}
          </label>
        </div>
        <div class="item-row">
          <p class="row-p mb-auto">{{ $t('Partner') }}</p>
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
          <p class="row-p">{{ $t('VisitingTime') }}</p>
          <p>{{ $t('Morning') }}</p>
          <el-time-select
            class="row-time-picker"
            :picker-options="pickerSetting"
            :placeholder="$t('Start')"
            v-model="data.morningShiftStart.value"
          ></el-time-select>
          <p style="margin-left: 1rem;">{{ $t('To') }}</p>
          <el-time-select
            class="row-time-picker"
            :picker-options="pickerSetting"
            :placeholder="$t('End')"
            v-model="data.morningShiftEnd.value"
          ></el-time-select>
        </div>
        <div class="item-row">
          <p class="row-p"></p>
          <p>{{ $t('Afternoon') }}</p>
          <el-time-select
            class="row-time-picker"
            :picker-options="pickerSetting"
            :placeholder="$t('Start')"
            v-model="data.afternoonShiftStart.value"
          ></el-time-select>
          <p style="margin-left: 1rem;">{{ $t('To') }}</p>
          <el-time-select
            class="row-time-picker"
            :picker-options="pickerSetting"
            :placeholder="$t('End')"
            v-model="data.afternoonShiftEnd.value"
          ></el-time-select>
        </div>
        <div class="item-row">
          <p class="row-p"></p>
          <p>{{ $t('Night') }}</p>
          <el-time-select
            class="row-time-picker"
            :picker-options="pickerSetting"
            :placeholder="$t('Start')"
            v-model="data.eveningShiftStart.value"
          ></el-time-select>
          <p style="margin-left: 1rem;">{{ $t('To') }}</p>
          <el-time-select
            class="row-time-picker"
            :picker-options="pickerSetting"
            :placeholder="$t('End')"
            v-model="data.eveningShiftEnd.value"
          ></el-time-select>
        </div>
      </div>
      <p class="mark">{{ $t('MailSetting') }}</p>
      <div class="main-item">
        <div class="item-row">
          <p class="row-p">{{ $t('UserAcc') }}</p>
          <el-input class="row-input" v-model="data.mailUserName.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">{{ $t('UserPwd') }}</p>
          <el-input class="row-input" v-model="data.mailUserPassword.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">{{ $t('Port') }}</p>
          <el-input class="row-input" v-model="data.mailPort.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">{{ $t('HostUrl') }}</p>
          <el-input class="row-input" v-model="data.mailUrl.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">{{ $t('ContactMail') }}</p>
          <el-input class="row-input" v-model="data.mailContactMail.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">{{ $t('ContactBccMail') }}</p>
          <el-input class="row-input" v-model="data.mailContactBccMail.value"></el-input>
        </div>
      </div>
      <p class="mark">{{ $t('HosptialInformation') }}</p>
      <div class="main-item">
        <div class="item-row">
          <p class="row-p">{{ $t('HosptialNo') }}</p>
          <p>{{ data.hospitalNo }}</p>
        </div>
        <div class="item-row">
          <p class="row-p">{{ $t('HosptialName') }}</p>
          <el-input class="row-input" v-model="data.hospitalName.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">{{ $t('HosptialTel') }}</p>
          <el-input class="row-input" v-model="data.hospitalTel.value"></el-input>
        </div>
        <!-- Google Maps -->
        <div class="item-row">
          <p class="row-p">{{ $t('HosptialAdd') }}</p>
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
          <p class="row-p">{{ $t('HospitalContactNamel') }}</p>
          <el-input class="row-input" v-model="data.hospitalContactName.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">{{ $t('HospitalContactTel') }}</p>
          <el-input class="row-input" v-model="data.hospitalContactTel.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p">{{ $t('HospitalSlogan') }}</p>
          <el-input class="row-input" v-model="data.hospitalSlogan.value"></el-input>
        </div>
        <div class="item-row">
          <p class="row-p" style="margin-bottom: auto;">關於醫院</p>
          <!-- Vue2 Editor -->
          <vue-editor :editorToolbar="customToolbar" v-model="data.hospitalAbout.value"></vue-editor>
          <!-- Vue2 Editor -->
        </div>
        <div class="item-row">
          <p class="row-p mb-auto">{{ $t('HospitalEnvironment') }}</p>
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
import { VueEditor } from 'vue2-editor';

const customToolbar = [
  [{ font: [] }],
  [{ header: 1 }, { header: 2 }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ color: [] }, { background: [] }],
  ['link', 'image', 'video', 'formula'],
];

export default {
  components: {
    VueEditor,
  },
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
      /* Vue2Editor */
      customToolbar,
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
          this.$router.push({ name: 'Setting' });
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
