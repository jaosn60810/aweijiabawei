<template>
  <div class="about">
    <div class="row no-gutters">
      <!-- 選擇所在區域 -->
      <div class="toolbox col-sm-6 p-2 bg-white">
        <!-- 選城市 -->
        <div class="form-group row ">
          <label for="cityName" class="col-sm-3 col-form-label text-left "
            >請選擇縣市:</label
          >
          <div class="col-sm-9">
            <select
              id="cityName"
              class="form-control"
              v-model="select.city"
              @change="cityChange"
            >
              <option value="all">全部</option>
              <option :value="city" v-for="city in cities" :key="city">
                {{ city }}
              </option>
            </select>
          </div>
        </div>
        <!-- 選收容所 -->
        <div class="form-group row ">
          <label for="areaName" class="col-sm-3 col-form-label text-left"
            >請選擇動物收容所:</label
          >
          <div class="col-sm-9">
            <select id="areaName" class="form-control" v-model="select.store">
              <option value="all">請選擇動物收容所</option>
              <option
                :value="a.ShelterName"
                v-for="a in shelterData.filter((city) => {
                  if (select.city === 'all') {
                    return city.CountyName;
                  } else {
                    return city.CountyName === select.city;
                  }
                })"
                :key="a.ShelterName"
              >
                {{ a.ShelterName }}
              </option>
            </select>
          </div>
        </div>
        <!-- 各收容所資料 -->
        <div class="overflow-auto bd-links">
          <div
            class="card"
            v-for="a in shelterData.filter((city) => {
              if (select.city === 'all' && select.store === 'all') {
                return city.CountyName;
              } else if (select.store === 'all') {
                return city.CountyName === select.city;
              } else {
                return city.ShelterName === select.store;
              }
            })"
            :key="a.ShelterName"
          >
            <div class="card-body" @click="showPopup(a.ShelterOrder)">
              <h6 class="card-title">
                <strong>{{ a.ShelterName }}</strong>
              </h6>
              <p class="card-text">
                開放認養數量:
                {{ getAdoptNum(a) }}
              </p>
              <p class="card-text">
                狗:
                {{
                  animals.filter((data) => {
                    if (data.shelter_name === a.ShelterName)
                      return data.animal_kind === '狗';
                  }).length
                }}
              </p>
              <b-progress
                :max="getAdoptNum(a)"
                height="2rem"
                animated
                show-value
              >
                <b-progress-bar :value="getDogNum(a)">
                  <span class="progress-text"
                    >捐款點數進度:
                    <strong
                      >{{ getDogNum(a) }} / {{ getAdoptNum(a) }}</strong
                    ></span
                  >
                </b-progress-bar>
              </b-progress>

              <p class="card-text">
                貓:
                {{
                  animals.filter((data) => {
                    if (data.shelter_name === a.ShelterName)
                      return data.animal_kind === '貓';
                  }).length
                }}
              </p>
              <b-progress
                :max="getAdoptNum(a)"
                height="2rem"
                animated
                show-value
              >
                <b-progress-bar :value="getCatNum(a)">
                  <span class="progress-text"
                    >捐款點數進度:
                    <strong
                      >{{ getCatNum(a) }} / {{ getAdoptNum(a) }}</strong
                    ></span
                  >
                </b-progress-bar>
              </b-progress>
            </div>
          </div>
        </div>
      </div>

      <!-- 顯示收容所位置 -->
      <div class="col-sm-6">
        <div id="map"></div>
      </div>
    </div>
    <Cart></Cart>
  </div>
</template>

<script>
import Cart from '../components/Cart';
import L from 'leaflet';
import shelterData from '../assets/data/shelterCity.json';
import asData from '../assets/data/animal-shelter.json';

let openStreetMap = {};

export default {
  name: 'about',
  data: () => ({
    asAPI: 'Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL',
    asData,
    shelterData,
    animals: [],
    dataReady: false,
    select: {
      city: 'all',
      store: 'all',
    },
    markers: [],
  }),
  props: {
    msg: String,
  },
  components: {
    Cart,
  },
  computed: {
    cities() {
      return [...new Set(this.shelterData.map(({ CountyName }) => CountyName))];
    },
    area() {
      const area = this.shelterData.filter(
        (data) => data.CountyName === this.select.city
      );
      return [...new Set(area.map(({ TownName }) => TownName))];
    },
    shelter() {
      return this.shelterData.filter((shelter) => {
        if (this.select.store === 'all' && this.select.city === 'all') {
          return shelter.CountyName;
        }
        if (this.select.store === 'all') {
          return shelter.CountyName === this.select.city;
        }
        return shelter.ShelterName === this.select.store;
      });
    },
  },
  watch: {
    shelter() {
      this.updateMap();
      this.updateAnimal();
    },
  },
  methods: {
    cityChange() {
      this.select.store = 'all';
    },
    ducumentReady() {
      this.shelterData.forEach((data) => {
        const marker = L.marker([data.LAT, data.LNG], {
          title: data.ShelterOrder,
        }).addTo(openStreetMap)
          .bindPopup(`<p><strong style="font-size: 20px;">${data.ShelterName}</strong></p>
          地址: ${data.Address}<br>
          電話: ${data.Tel}<br>
          <span style="color: #d45345;">${data.Memo}</span><br>
          認養網頁: <a href="${data.link}" target="_blank">${data.link}</a>`);
        this.markers.push(marker);
      });
    },
    updateMap() {
      // clear markers
      openStreetMap.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          openStreetMap.removeLayer(layer);
          this.markers = [];
        }
      });

      // add markers
      this.shelter.forEach((data) => {
        // 透過藥局經緯度疊加標記
        const marker = L.marker([data.LAT, data.LNG], {
          title: data.ShelterOrder,
        }).addTo(openStreetMap)
          .bindPopup(`<p><strong style="font-size: 20px;">${data.ShelterName}</strong></p>
          地址: ${data.Address}<br>
          電話: ${data.Tel}<br>
          <span style="color: #d45345;">${data.Memo}</span><br>
          認養網頁: <a href="${data.link}" target="_blank">${data.link}</a>`);
        this.markers.push(marker);
      });
    },
    updateAnimal() {
      // console.log(this.shelter);
      const result = this.asData.filter((f) =>
        this.shelter.filter((d) => d.ShelterName === f.shelter_name)
      );
      this.animals = result;
    },
    showPopup(id) {
      this.markers.forEach((marker) => {
        const markerID = marker.options.title;
        const position = marker.getLatLng();
        if (markerID === id) {
          openStreetMap.setView(position, 15);
          marker.openPopup();
        }
      });
    },
    getAdoptNum(a) {
      return this.animals.filter((data) => data.shelter_name === a.ShelterName)
        .length;
    },
    getDogNum(a) {
      return this.animals.filter((data) => {
        if (data.shelter_name === a.ShelterName)
          return data.animal_kind === '狗';
      }).length;
    },
    getCatNum(a) {
      return this.animals.filter((data) => {
        if (data.shelter_name === a.ShelterName)
          return data.animal_kind === '貓';
      }).length;
    },
  },
  mounted() {
    /**
    const api = `${this.asAPI}&animal_status=OPEN`;
    this.$http.get(api).then((response) => {
      this.asData = response.data;
      this.dataReady = true;
    });
     */

    openStreetMap = L.map('map', {
      center: [24, 120.8],
      // 可以嘗試改變 zoom 的數值
      // 筆者嘗試後覺得 18 的縮放比例是較適當的查詢範圍
      zoom: 8,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
    }).addTo(openStreetMap);

    this.ducumentReady();
    this.updateAnimal();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'bootstrap/scss/bootstrap';

#map {
  position: relative;
  height: 100vh;
}

.bd-links {
  max-height: calc(100vh - 12.5rem);
  overflow-y: auto;
}

.card {
  cursor: pointer;
}

.card:hover {
  background-color: #f1f1f1;
}

.progress-text {
  color: black;
  position: absolute;
  z-index: 10;
  transform: translateX(1rem);
}
</style>
