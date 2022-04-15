<template>
  <div class="product ">
    <div class="container-fluid">
      <!-- main part -->
      <div class="row mt-5">
        <!-- 測攔 -->
        <div class="col-12 mb-3  col-md-2 ">
          <!-- 晃動愛心 -->
          <div class="h3 mb-5">
            <span class="shake-slow shake-constant">打賞幫補血</span>
            <span class="shake-slow shake-constant" style="white-space: nowrap;"
              >_(┐ ◟;ﾟдﾟ)ノ
              <b-icon
                icon="heart-fill"
                animation="throb"
                font-scale="1"
                color="#ff00ff"
              ></b-icon
            ></span>
          </div>

          <!-- 跑馬燈 -->
          <div class="mt-5 w-100 d-none d-lg-block">
            <vue-seamless-scroll
              :data="List"
              class="seamless-warp "
              :class-option="classOption"
              ref="seamlessScroll"
            >
              <ul class="w-100">
                <li
                  class="DataList_top row mx-0 w-100 bg-info"
                  v-for="(item, index) in List"
                  :key="index"
                >
                  <div class="col-3 col-xl-3 p-0 d-none d-xl-block">
                    {{ item.account }}
                  </div>
                  <div class="col-6 col-xl-3 p-0">
                    <div>
                      <b-avatar
                        variant="info"
                        :badge-variant="
                          item.shelterId % 2 === 0 ? 'warning' : 'danger'
                        "
                        :src="
                          'https://placekitten.com/300/300?image=' +
                            item.shelterId
                        "
                        size="4rem"
                      >
                        <template #badge
                          ><b-icon
                            :icon="
                              item.shelterId % 2 === 0
                                ? 'star-fill'
                                : 'suit-heart-fill'
                            "
                          ></b-icon></template
                      ></b-avatar>
                    </div>
                  </div>
                  <div class="col-6 col-xl-6 p-0">
                    {{ item.shelterId % 2 === 0 ? '餵飽' : '醫治'
                    }}<strong>{{
                      Math.floor(item.shelterId + Math.sqrt(item.shelterId))
                    }}</strong
                    >隻 <br />毛寶
                  </div>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </div>

        <!-- 卡片區 -->
        <div class="col-12 col-md-10 row mx-auto">
          <!-- 卡片列表 -->
          <div
            class=" col-md-4 col-lg-3  mb-3"
            v-for="(shelter, index) in shelterSortData"
            :key="shelter.ShelterOrder"
          >
            <!-- 每張卡片 -->
            <div
              class="card product-item h-100"
              :style="{
                background:
                  index === 0
                    ? firstCardColor
                    : index === 1
                    ? secondCardColor
                    : index === 2
                    ? thirdCardColor
                    : 'white',
              }"
            >
              <!-- 收容所卡片狀態 -->
              <div class="card-body d-flex flex-column">
                <div class="card-title h5 my-3">
                  <div>
                    <strong>小{{ shelter.ShelterName[0] }}</strong>
                    <br />
                    共有{{ shelter.MaxAmls }}位同伴
                  </div>
                </div>
              </div>

              <!-- 評級區 -->
              <b-form-rating
                id="rating-readonly"
                icon-empty="heart"
                icon-half="heart-half"
                icon-full="heart-fill"
                icon-clear="slash-circle"
                show-clear
                :value="((33 - index) / 33) * 6"
                readonly
                class="mb-2"
                color="#ff00ff"
              ></b-form-rating>

              <div class="shelterCity-img-list">
                <img
                  :src="`https://placedog.net/${index + 200}`"
                  class="card-img-top shelterCity-img "
                  alt="..."
                />
              </div>

              <p class="card-text h3">
                <strong>{{ shelter.ShelterName }}</strong>
              </p>

              <!-- 收容所卡片按鈕區-->
              <div class="card-body d-flex row">
                <div class="col-12 ">
                  <button
                    @click="donateInfo(shelter, index)"
                    class="btn btn-primary mb-3 mx-auto w-75 "
                    style="background-color:cadetblue; border-color: transparent;"
                  >
                    <div class="h3">
                      打賞
                      <b-icon
                        icon="heart-fill"
                        animation="throb"
                        font-scale="1"
                        color="#ff00ff"
                      ></b-icon>
                    </div>
                  </button>
                </div>
              </div>
            </div>
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
          <!-- 燈相 header -->
          <div class="modal-header">
            <p class="modal-title text-center h2" id="exampleModalLabel">
              {{ shelterCity.ShelterName }}
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

          <!-- 燈箱 body 上半部 -->
          <div class="modal-body row">
            <!-- 卡片幻燈片區 -->
            <div class="col-sm-8">
              <!-- 新卡片頭貼 -->
              <!-- 圖片 -->
              <div class="product-avatar-list">
                <div class="shelterCity-img-list circle">
                  <img
                    :src="`https://placedog.net/${shelterCity.index + 200}`"
                    class="card-img-top card-img rounded-circle"
                    alt="..."
                  />
                </div>

                <!-- 來自XXX -->
                <b-avatar size="7rem" class="product-avatar d-none d-sm-flex">
                  <p class=" d-flex  flex-column m-0">
                    <strong class="danger h4 text-warning">{{
                      shelterCity.name
                    }}</strong>
                  </p>
                </b-avatar>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group my-3">
                <label class="form-label">
                  <div><i class="fas fa-bone "></i></div>
                  <div>{{ transferPointToFoods }}</div></label
                >
                <input
                  type="number"
                  class="form-control"
                  placeholder="點數"
                  v-model.number="donationFoodPoints"
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
                <label class="form-label">
                  <div><i class="fas fa-briefcase-medical  "></i></div>
                  <div>{{ transferPointToMedical }}</div>
                </label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="點數"
                  v-model.number="donationMedicalPoints"
                />
              </div>

              <div class="form-group my-3">
                <button
                  type="button"
                  class="btn btn-primary"
                  style="background-color: cadetblue; border-color:transparent; color:rgb(5, 28, 34);"
                  @click="donateMedical()"
                >
                  捐贈醫療
                </button>
              </div>
            </div>
          </div>

          <!-- 燈箱 body 下半部 -->
          <div class="modal-body ">
            <!-- 進度條 -->
            <div class="d-none d-sm-block">
              <!-- 收容所進度條 -->
              <!--食物進度條 -->
              <div class="h6 mt-3">
                <i class="fas fa-bone "></i> 還有
                <strong>{{ shelterCity.MaxAmls }}</strong>
                隻肚子餓的毛寶
              </div>

              <b-progress :max="shelterCity.MaxAmls" height="1rem" class="mb-3">
                <b-progress-bar
                  :value="shelterCity.shelterGetFood"
                  variant="danger"
                >
                </b-progress-bar>
              </b-progress>
              <!--醫療進度條 -->
              <div class="h6 mt-3">
                <i class="fas fa-briefcase-medical   "></i>
                還有
                <strong>{{ shelterCity.MaxAmls }}</strong>
                隻生病的毛寶
              </div>

              <b-progress :max="shelterCity.MaxAmls" height="1rem">
                <b-progress-bar
                  :value="shelterCity.shelterGetMedical"
                  variant="danger"
                >
                </b-progress-bar>
              </b-progress>
            </div>

            <!-- 資訊區 -->
            <div class="mt-3">
              地址:
              <a
                :href="
                  `https://www.google.com.tw/maps/place/${shelterCity.address}`
                "
                target="_blank"
                title="Google Map"
              >
                {{ shelterCity.Address }}</a
              ><br />
              電話: {{ shelterCity.Tel }}<br />
              <span style="color: #d45345;"
                >開放時間: {{ shelterCity.Memo }}</span
              ><br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

import shelterCities from '../assets/data/shelterCity.json';
import marquee from '../assets/data/marquee.json';

import vueSeamlessScroll from 'vue-seamless-scroll';

export default {
  name: 'product',
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      shelterSortData: shelterCities,
      shelterCity: {},
      donationFoodPoints: 0,
      donationMedicalPoints: 0,
      List: marquee,
      firstCardColor: '#dc3545',
      secondCardColor: '#e04b59',
      thirdCardColor: '#e4606d',
    };
  },
  methods: {
    donateInfo(shelterCity, index) {
      $('#miniCart').modal('show');
      this.shelterCity = shelterCity;
      this.shelterCity.shelterGetMedical = 0;
      this.shelterCity.shelterGetFood = 0;
      this.shelterCity.index = index;
      this.shelterCity.name = `小${this.shelterCity.ShelterName[0]}`;
    },

    donateFood() {
      this.shelterCity.shelterGetFood += this.donationFoodPoints;
      window.Swal.fire({
        icon: 'success',
        title: '食物捐款成功',
      });
      this.donationFoodPoints = 0;
    },
    donateMedical() {
      this.shelterCity.shelterGetMedical += this.donationMedicalPoints;
      window.Swal.fire({
        icon: 'success',
        title: '醫療捐款成功',
      });
      this.donationMedicalPoints = 0;
    },
  },

  computed: {
    transferPointToFoods() {
      return `餵飽 ${(this.donationFoodPoints / 400).toFixed(2)} 隻毛寶`;
    },
    transferPointToMedical() {
      return `醫治 ${(this.donationMedicalPoints / 200).toFixed(2)} 隻毛寶`;
    },

    classOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 4, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
        autoPlay: true,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.list-group-item.active {
  background-color: rgb(227, 242, 253);
  color: black;
}
.product {
  background: #f2f2f2;
  padding-bottom: 3rem;
}

.card-img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}

.shelterCity-img {
  width: 80%;
  aspect-ratio: 1 / 1;
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

.textStyle {
  font-size: 32px;
  font-weight: 700;
}

.seamless-warp {
  width: 100%;
  height: 50vh;
  overflow: hidden;
}
ul {
  padding: 0;
}
.DataList_top {
  list-style: none;
  width: 100%;
  height: 4rem;
  background-color: #4383c1;
  margin-top: 0.5rem;
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
}
.DataList_left {
  float: left;
  text-align: center;
}
.one {
  width: 20%;
}
.two {
  width: 20%;
  // margin-left: 1%;
}
.three {
  width: 20%;
  // margin-left: 1%;
}
.four {
  width: 20%;
  // margin-left: 1%;
}
.five {
  // width: 20%;
  // margin-left: 1%;
  color: greenyellow;
}

.user__avatar {
  border-radius: 50%;
  height: 64px;
  overflow: hidden;
  position: relative;
  width: 64px;
  z-index: 9;
}

.user__avatar img {
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in;
  width: 100%;
}

.user__avatar:hover img {
  filter: blur(1px) brightness(0.75);
  transform: scale(1.05);
}

.product-avatar-list {
  position: relative;
}

.product-avatar {
  // transform: translate(5rem, -5rem);
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
