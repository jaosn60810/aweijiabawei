<template>
  <div class="productview">
    <Navbar></Navbar>
    <Product></Product>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Product from '../components/Product';

export default {
  name: 'productview',
  props: {
    msg: String,
  },
  components: {
    Navbar,
    Product,
    // Cart,
  },
};
</script>
