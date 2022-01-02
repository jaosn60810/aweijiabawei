<template>
  <div class="Navbar">
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style="background-color: #e3f2fd;"
    >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link" href="#">首頁</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/aboutview" class="nav-link" href="#"
              >地圖</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/leaderboard" class="nav-link" href="#"
              >排行榜</router-link
            >
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/productsview" href="#"
              >捐助</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="Membercenter">會員中心</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <a
            class="btn my-2 my-sm-0"
            data-toggle="modal"
            data-target="#login"
            v-if="login === null"
            style="border-color: cadetblue; color: cadetblue;"
            >登入/ 註冊</a
          >
          <a
            class="btn my-2 my-sm-0"
            @click.stop="logout()"
            v-if="login !== null"
            style="border-color: cadetblue; color: cadetblue;"
          >
            登出
          </a>
          <a
            class="fas fa-shopping-cart mx-3 my-3"
            data-toggle="modal"
            data-target="#miniCart"
            style="color: cadetblue;"
          ></a>
        </form>
      </div>
    </nav>
    <Login></Login>
    <router-view></router-view>
  </div>
</template>

<script>
import { fb, db } from '../firebase';
import Login from '../components/Login.vue';
import $ from 'jquery';

export default {
  name: 'Navbar',
  props: {
    msg: String,
  },
  components: {
    Login,
  },
  data() {
    return {
      // login: fb.auth().currentUser, //若沒有currentuser則會返回null
      login: JSON.parse(localStorage.getItem('token')),
    };
  },
  methods: {
    logoutOld() {
      fb.auth().signOut();
      this.$store
        .commit('logoutuser')
        .then(() => {
          window.Toast.fire({
            icon: 'success',
            title: "You're logged out!",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      var myHeaders = new Headers();
      let token = JSON.parse(localStorage.getItem('token'));

      function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );
        return JSON.parse(jsonPayload);
      }

      let payload = parseJwt(token);

      myHeaders.append('Authorization', `Bearer ${token}`);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify(payload.given_name);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        'https://finalproject-336509.appspot.com/api/Auth/ClearToken',
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === 'Token已清除') {
            localStorage.removeItem('token');
            window.Toast.fire({
              icon: 'success',
              title: '登出成功',
            });
            this.login = null;
          } else {
            window.Toast.fire({
              icon: 'error',
              title: '登出失敗',
            });
          }
        })
        .catch((error) => console.log('error', error));
    },
    MembercenterOld() {
      if (fb.auth().currentUser) {
        this.gotoadmin();
      } else if (fb.auth().currentUser === null) {
        $('#login').modal('show');
      }
    },
    Membercenter() {
      if (localStorage.getItem('token') !== null) {
        this.$router.replace('/adminforadmin/profile');
      } else {
        $('#login').modal('show');
      }
    },
    gotoadmin() {
      let user = fb.auth().currentUser;
      let docRef = db.collection('profiles').doc(user.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            let role = doc.data().role;
            console.log(role);
            return role;
          } else {
            console.log('No such document!');
          }
        })
        .then((role) => {
          if (role != 'user') {
            this.$router.replace('/adminforadmin');
          } else {
            this.$router.replace('/admin');
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error);
        });
    },
  },
};
</script>
<style scoped lang="scss">
.nav-link {
  color: red;
}
</style>
