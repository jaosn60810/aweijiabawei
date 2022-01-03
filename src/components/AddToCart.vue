<template>
  <div class="add-to-cart">
    <!-- <button
      class="btn btn-primary mb-3 mx-auto w-75"
      @click="addToCart"
      style="background-color:cadetblue; border-color: transparent;"
    >
      打賞
    </button>
    <Cart></Cart> -->
    <button
      class="btn btn-primary mb-3 mx-auto w-75"
      @click="addToCart"
      style="background-color:cadetblue; border-color: transparent;"
    >
      打賞
    </button>
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
          <div
            class="modal-body row"
            v-for="(item, index) in this.$store.state.cart"
            :key="index"
          >
            <div class="col-4">
              <!-- <img
                :src="item.productImage"
                width="80px"
                class="align-self-center mr-3"
                alt=""
              /> -->
              <!-- 卡片幻燈片 -->
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
            <div class="col-8">
              <h5 class="text-left">
                {{ item.productName }}
                <span
                  class="float-right myMOUSE"
                  @click="$store.commit('removeFromCart', item)"
                  >X</span
                >
              </h5>
              <h5 class="text-left">{{ item.productPrice | currency }}</h5>
              <h5 class="text-left">Quantity: {{ item.productQuantity }}</h5>
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
            <a
              class="btn btn-primary"
              href="#"
              v-if="login != null"
              @click="checkout"
              >Check your Cart</a
            >
            <!-- 若為未登入狀態則跳出登入視窗 -->
            <a
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#login"
              @click="checkout"
              v-if="login === null"
              >Check your Cart</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
// import Cart from '@/components/Cart.vue';
export default {
  name: 'add-to-cart',
  props: {
    // name: String,
    // price: Number,
    // id: String,
    // image: String,

    shelterData: Object,
    shelterImages: Array,
  },
  data() {
    return {
      item: {
        productName: this.name,
        productPrice: this.price,
        productId: this.id,
        productImage: this.image,
        productQuantity: 1,
      },
    };
  },
  methods: {
    addToCart() {
      $('#miniCart').modal('show');
      this.$store.commit('addToCart', this.item);
    },
  },
  components: {
    // Cart,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
