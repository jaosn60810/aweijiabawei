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
            v-for="(shelterCity, index) in shelterData"
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
                <p class="card-title fs-6">{{ shelterCity.shelterName }}</p>
              </div>
              <!-- 收容所卡片按鈕區-->
              <div class="card-body d-flex row">
                <!-- 收容所卡片資訊按鈕 -->
                <div class="col-6 ">
                  <a
                    class="btn mb-3 btn-info mx-auto w-75"
                    @click="
                      info(shelterCity);
                      shelterDataNeedFoodAndMedical;
                    "
                    >資訊</a
                  >
                </div>
                <div class="col-6 ">
                  <button
                    @click="donateInfo(shelterCity)"
                    class="btn btn-primary mb-3 mx-auto w-75"
                    style="background-color:cadetblue; border-color: transparent;"
                  >
                    打賞
                  </button>
                </div>

                <!-- 收容所卡片打賞按鈕 -->
                <!-- <AddToCart
                  :shelter-data="shelterCity"
                  :shelter-images="shelterImages"
                  class="col-6"
                >
                </AddToCart> -->
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
              {{ shelterCity.shelterName }}
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
              :max="shelterCity.shelterNeedFood"
              height="2rem"
              animated
              show-value
              class="mb-3"
            >
              <b-progress-bar :value="shelterCity.shelterNeedFood / 3">
                <span class="progress-text"
                  >捐款點數進度:
                  <strong
                    >{{ Math.floor(shelterCity.shelterNeedFood / 3) }} /
                    {{ shelterCity.shelterNeedFood }}</strong
                  ></span
                >
              </b-progress-bar>
            </b-progress>
            <!--醫療進度條 -->
            <b-progress
              :max="shelterCity.shelterNeedMedical"
              height="2rem"
              animated
              show-value
            >
              <b-progress-bar :value="shelterCity.shelterNeedMedical / 2">
                <span class="progress-text"
                  >捐款點數進度:
                  <strong
                    >{{ Math.floor(shelterCity.shelterNeedMedical / 2) }} /
                    {{ shelterCity.shelterNeedMedical }}</strong
                  ></span
                >
              </b-progress-bar>
            </b-progress>
          </div>
        </div>
      </div>
    </div>

    <!-- 點擊打賞按鈕的出現的燈箱 -->
    <div
      class="modal fade"
      id="miniCart"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title text-left h2" id="exampleModalLabel">
              My cart
            </p>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body row">
            <div class="col-8">
              <!-- <img
                :src="item.productImage"
                width="80px"
                class="align-self-center mr-3"
                alt=""
              /> -->
              <!-- 卡片幻燈片 -->
              <b-carousel
                id="carousel-2"
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
            <div class="col-4">
              <!-- <h5 class="text-left">
                {{ item.productName }}
                <span
                  class="float-right myMOUSE"
                  @click="$store.commit('removeFromCart', item)"
                  >X</span
                >
              </h5> -->
              <!-- <h5 class="text-left">{{ item.productPrice | currency }}</h5>
              <h5 class="text-left">Quantity: {{ item.productQuantity }}</h5> -->
              <div class="form-group my-3">
                <label class="form-label">食物</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="點數"
                  v-model="donationFoodPoints"
                />
              </div>

              <div class="form-group my-3">
                <button
                  type="button"
                  class="btn btn-primary"
                  style="background-color: cadetblue; border-color:transparent; color:rgb(5, 28, 34);"
                  @click="donateFood()"
                >
                  捐贈食物
                </button>
              </div>

              <div class="form-group my-3">
                <label class="form-label">醫療</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="點數"
                  v-model="donationMedicalPoints"
                />
              </div>

              <div class="form-group my-3">
                <button
                  type="button"
                  class="btn btn-primary"
                  style="background-color: cadetblue; border-color:transparent; color:rgb(5, 28, 34);"
                  @click="donateMedical"
                >
                  捐贈醫療
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Continue shopping
            </button>
            <!-- 若為登入狀態則進入結帳頁面 -->
            <!-- <a
              class="btn btn-primary"
              href="#"
              v-if="login != null"
              @click="checkout"
              >Check your Cart</a
            > -->
            <!-- 若為未登入狀態則跳出登入視窗 -->
            <!-- <a
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#login"
              @click="checkout"
              v-if="login === null"
              >Check your Cart</a
            > -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';
import $ from 'jquery';

// import AddToCart from './AddToCart.vue';

import dogImg from '../assets/data/dogImg.json';
import animalShelters from '../assets/data/animal-shelter.json';
import shelterCities from '../assets/data/shelterCity.json';

export default {
  name: 'product',
  components: {
    // AddToCart,
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
      shelterData: [],
      shelterNeedFood: [],
      shelterNeedMedical: [],
      donationFoodPoints: 0,
      donationMedicalPoints: 0,
    };
  },
  methods: {
    donate(shelterCity) {
      this.shelterCity = shelterCity;
      console.log(this.shelterCity);
      $('#miniCart').modal('show');
    },
    getImage(images) {
      return images[0];
    },
    info(shelterCity) {
      $('#itemInfo').modal('show');

      this.shelterCity = shelterCity;
    },
    donateInfo(shelterCity) {
      $('#miniCart').modal('show');
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
    donateFood() {
      if (localStorage.getItem('token') === null) {
        $('#miniCart').modal('hide');
        $('#login').modal('show');
        return;
      }
      let token = JSON.parse(localStorage.getItem('token'));
      let bearerToken = 'Bearer ' + token;

      let account = JSON.parse(localStorage.getItem('account'));

      var myHeaders = new Headers();
      myHeaders.append('Authorization', bearerToken);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        account: account,
        donationPoints: parseInt(this.donationFoodPoints),
        shelterId: parseInt(this.shelterCity.shelterId),
        purposeId: 1,
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        'https://finalproject-336509.appspot.com/api/userdonation/donatePoints',
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === '捐點成功') {
            window.Swal.fire({
              icon: 'success',
              title: '捐點成功',
            });
          } else {
            window.Swal.fire({
              icon: 'error',
              title: '錯誤',
            });
          }
        })
        .catch((error) => console.log('error', error));
    },
    donateMedical() {
      if (localStorage.getItem('token') === null) {
        $('#miniCart').modal('hide');
        $('#login').modal('show');
        return;
      }
      let token = JSON.parse(localStorage.getItem('token'));
      let bearerToken = 'Bearer ' + token;

      let account = JSON.parse(localStorage.getItem('account'));

      var myHeaders = new Headers();
      myHeaders.append('Authorization', bearerToken);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        account: account,
        donationPoints: parseInt(this.donationMedicalPoints),
        shelterId: parseInt(this.shelterCity.shelterId),
        purposeId: 2,
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        'https://finalproject-336509.appspot.com/api/userdonation/donatePoints',
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === '捐點成功') {
            window.Swal.fire({
              icon: 'success',
              title: '捐點成功',
            });
          } else {
            window.Swal.fire({
              icon: 'error',
              title: '錯誤',
            });
          }
        })
        .catch((error) => console.log('error', error));
    },
    goToLogin() {
      if (localStorage.getItem('token') === null) {
        $('#login').modal('show');
      }
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
  mounted() {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch('https://finalproject-336509.appspot.com/api/shelter', requestOptions)
      .then((response) => response.json())
      .then((result) => (this.shelterData = result))
      .catch((error) => console.log('error', error));

    fetch(
      'https://finalproject-336509.appspot.com/api/shelter/shelterrank/1',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => (this.shelterNeedFood = result))
      .catch((error) => console.log('error', error));

    fetch(
      'https://finalproject-336509.appspot.com/api/shelter/shelterrank/2',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => (this.shelterNeedMedical = result))
      .catch((error) => console.log('error', error));
  },
  computed: {
    shelterDataNeedFoodAndMedical() {
      this.shelterData.forEach((itemShelterData) => {
        // 食物
        this.shelterNeedFood.forEach((itemShelterNeedFood) => {
          if (itemShelterData.shelterName === itemShelterNeedFood.shelterName) {
            itemShelterData.shelterNeedFood =
              itemShelterNeedFood.shelterNeedPoints;
            itemShelterData.shelterGetFood =
              itemShelterNeedFood.shelterGetPoints;
          }
        });

        // 醫療
        this.shelterNeedMedical.forEach((itemShelterNeedMedical) => {
          if (
            itemShelterData.shelterName === itemShelterNeedMedical.shelterName
          ) {
            itemShelterData.shelterNeedMedical =
              itemShelterNeedMedical.shelterNeedPoints;
            itemShelterData.shelterGetMedical =
              itemShelterNeedMedical.shelterGetPoints;
          }
        });
      });
      return this.shelterData;
    },
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
