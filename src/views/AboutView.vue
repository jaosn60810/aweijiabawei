<template>
  <div class="aboutview">
    <Navbar></Navbar>
    <About></About>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import About from '../components/About';

export default {
  name: 'aboutview',
  components: {
    Navbar,
    About,
  },
};
</script>
