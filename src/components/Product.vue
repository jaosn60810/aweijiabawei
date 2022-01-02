<template>
  <div class="product ">
    <div class="container-fluid">
      <div class="row mt-5">
        <!-- 測攔 -->
        <div class="col-2">
          <div class="list-group ">
            <!-- 又餓又病按鈕 -->

            <button
              type="button"
              class="list-group-item list-group-item-action px-0"
              aria-current="true"
              @click="sortByAll"
              :class="{ active: activeBtn === 'all' }"
            >
              <i class="fas fa-drumstick-bite food-icon"></i>
              <span>&nbsp;&times;&nbsp;</span>
              <i class="fas fa-briefcase-medical medical-icon"></i>
            </button>
            <!-- 有點餓按鈕 -->
            <button
              type="button"
              class="list-group-item list-group-item-action px-0"
              aria-current="true"
              @click="
                sortByHungry();
                getAnimalsPics();
              "
              :class="{ active: activeBtn === 'hungry' }"
            >
              <i class="fas fa-drumstick-bite food-icon"></i>
            </button>
            <!-- 有點病按鈕 -->
            <button
              type="button"
              class="list-group-item list-group-item-action px-0"
              @click="
                sortBySick();
                getAnimalsPics();
              "
              :class="{ active: activeBtn === 'sick' }"
            >
              <i class="fas fa-briefcase-medical medical-icon"></i>
            </button>
          </div>
        </div>

        <!-- 卡片區 -->
        <div class="col-10 row">
          <!-- 卡片列表 -->
          <div
            class=" col-md-4 col-lg-3  mb-3"
            v-for="(shelterCity, index) in shelterCities"
            :key="index"
          >
            <!-- 每張卡片 -->
            <div class="card product-item h-100">
              <!-- 卡片幻燈片 -->
              <carousel id="pic" :perPage="1" :paginationPadding="3">
                <slide v-for="(image, index) in shelterImages" :key="index">
                  <img
                    :src="image"
                    class="card-img-top shelterCity-img"
                    alt="..."
                  />
                </slide>
              </carousel>

              <!-- 收容所卡片名稱區 -->
              <div class="card-body d-flex flex-column">
                <p class="card-title fs-6">{{ shelterCity.ShelterName }}</p>
              </div>
              <!-- 收容所卡片按鈕區-->
              <div class="card-body d-flex row">
                <!-- 收容所卡片資訊按鈕 -->
                <div class="col-6">
                  <a
                    class="btn mb-3 btn-info mx-auto w-75"
                    @click="info(shelterCity)"
                    >資訊</a
                  >
                </div>
                <!-- 收容所卡片打賞按鈕 -->
                <AddToCart
                  :image="getImage(shelterImages)"
                  :id="shelterCity.ShelterOrder"
                  :price="shelterCity.MaxAmls"
                  :name="shelterCity.ShelterName"
                  class="col-6"
                >
                </AddToCart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 點擊資訊按鈕的出現的燈箱 -->
    <div
      class="modal fade"
      id="itemInfo"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <!-- 燈箱 head 區 -->
          <div class="modal-header">
            <!-- 燈箱 head 區收容所名稱 -->
            <p class="modal-title text-left h2" id="exampleModalLabel">
              {{ shelterCity.ShelterName }}
            </p>
            <!-- 燈箱 head 關閉 X 按鈕 -->
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- 燈箱 body 區 -->
          <div class="modal-body">
            <b-carousel
              id="carousel-1"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333;"
            >
              <!-- Slides with image only -->
              <b-carousel-slide
                :img-src="image"
                v-for="image in shelterImages"
                :key="image"
                class="modal-shelterCity-img"
              ></b-carousel-slide>
            </b-carousel>
          </div>

          <!-- 燈箱 body 區 -->
          <div class="modal-body">
            <!-- 收容所進度條 -->
            <!--食物進度條 -->
            <b-progress
              :max="shelterCity.MaxAmls"
              height="2rem"
              animated
              show-value
              class="mb-3"
            >
              <b-progress-bar :value="getDogNum(shelterCity)">
                <span class="progress-text"
                  >捐款點數進度:
                  <strong
                    >{{ getDogNum(shelterCity) }} /
                    {{ shelterCity.MaxAmls }}</strong
                  ></span
                >
              </b-progress-bar>
            </b-progress>
            <!--醫療進度條 -->
            <b-progress
              :max="shelterCity.MaxAmls"
              height="2rem"
              animated
              show-value
            >
              <b-progress-bar :value="getCatNum(shelterCity)">
                <span class="progress-text"
                  >捐款點數進度:
                  <strong
                    >{{ getDogNum(shelterCity) }} /
                    {{ shelterCity.MaxAmls }}</strong
                  ></span
                >
              </b-progress-bar>
            </b-progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';
import $ from 'jquery';

import AddToCart from './AddToCart.vue';

import dogImg from '../assets/data/dogImg.json';
import animalShelters from '../assets/data/animal-shelter.json';
import shelterCities from '../assets/data/shelterCity.json';

export default {
  name: 'product',
  components: {
    AddToCart,
  },
  data() {
    return {
      products: [],
      product: {},
      productsImages: dogImg,
      shelterCity: {},
      shelterCities: shelterCities.slice(0, 10),
      animalShelters: animalShelters,
      activeBtn: 'all',
      shelterImages: [],
    };
  },
  methods: {
    getImage(images) {
      return images[0];
    },
    info(shelterCity) {
      $('#itemInfo').modal('show');

      this.shelterCity = shelterCity;
    },
    sortByAll() {
      this.activeBtn = 'all';
      this.shelterCities = shelterCities.slice(0, 10);
    },
    sortByHungry() {
      this.activeBtn = 'hungry';
      this.shelterCities = shelterCities.slice(10, 20);
    },
    sortBySick() {
      this.activeBtn = 'sick';
      this.shelterCities = shelterCities.slice(20, 30);
    },
    getDogNum(shelterCity) {
      return this.animalShelters.filter((data) => {
        if (data.shelter_name === shelterCity.ShelterName)
          return data.animal_kind === '狗';
      }).length;
    },
    getCatNum(shelterCity) {
      return this.animalShelters.filter((data) => {
        if (data.shelter_name === shelterCity.ShelterName)
          return data.animal_kind === '貓';
      }).length;
    },
    getAnimalsPics() {
      let dogImgArr = [];
      for (let i = 0; i < 3; i++) {
        let randomNum = Math.floor(Math.random() * 100) + 1;
        dogImgArr[i] = this.productsImages[randomNum];
      }
      this.shelterImages = dogImgArr;
    },
  },
  firestore() {
    return {
      products: db.collection('products'),
    };
  },

  created() {
    let dogImgArr = [];
    for (let i = 0; i < 3; i++) {
      let randomNum = Math.floor(Math.random() * 100) + 1;
      dogImgArr[i] = this.productsImages[randomNum];
    }
    this.shelterImages = dogImgArr;
  },
};
</script>

<style scoped lang="scss">
.product {
  background: #f2f2f2;
  padding-bottom: 3rem;
}

.shelterCity-img {
  width: 100%;
  height: 100%;
  max-height: 250px;
  object-fit: cover;
}

.modal-shelterCity-img {
  width: 100%;
  height: 100%;
  max-height: 250px;
  object-fit: cover;
}

.card-body {
  padding: 0;
}

.progress-text {
  color: black;
  position: absolute;
  z-index: 10;
  transform: translateX(1rem);
}

.food-icon {
  display: inline-block;
}

.medical-icon {
  display: inline-block;
}
</style>
