<template>
  <div class="profiles">
    <div class="container py-3">
      <!-- <h2 style="text-align: left; margin-bottom: 50px; margin-top: 20px;">
        You can edit your personal information here!
      </h2> -->
      <ul class="nav nav-tabs px-3">
        <li class="nav-item">
          <a
            class="nav-link active"
            href="#profile"
            data-toggle="tab"
            style="color:cadetblue"
            >會員資訊</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="#account"
            data-toggle="tab"
            style="color:cadetblue"
            >設定</a
          >
        </li>
      </ul>
      <!--tag content-->
      <div class="tab-content">
        <!-- Profile tag -->
        <div class="tab-pane fade show active" id="profile">
          <div class="login-input text-left mx-3 my-2">
            <div class="form-group my-3">
              <label class="form-label">姓名</label>
              <input
                class="form-control"
                placeholder="姓名"
                v-model="profile.name"
                disabled
              />
            </div>

            <div class="form-group my-3">
              <label class="form-label">點數</label>
              <input
                class="form-control"
                placeholder="點數"
                v-model="profile.remainingPoints"
                disabled
              />
            </div>

            <div class="form-group ">
              <button
                class="btn btn-primary"
                style="background-color: cadetblue; border-color:transparent; color:rgb(5, 28, 34);"
                type="button"
                @click="addValue()"
              >
                把錢換成愛心
              </button>
            </div>

            <div class="form-group my-3">
              <label class="form-label">本月捐款</label>
              <input
                class="form-control"
                v-model="profile.monthDonation"
                disabled
              />
            </div>

            <div class="form-group my-3">
              <label class="form-label">本年捐款</label>
              <input
                class="form-control"
                v-model="profile.yearDonation"
                disabled
              />
            </div>

            <div class="form-group my-3">
              <label class="form-label">總捐款</label>
              <input
                class="form-control"
                v-model="profile.soFarDonation"
                disabled
              />
            </div>

            <div class="form-group my-3">
              <label class="form-label">User ID</label>
              <input
                class="form-control"
                placeholder="User ID"
                v-model="profile.postcode"
                disabled
              />
            </div>
          </div>
        </div>

        <!-- Account setting tag  -->
        <div class="tab-pane fade" id="account">
          <div class="login-input text-left mx-3 my-2">
            <div class="form-group my-3">
              <label class="form-label">名稱</label>
              <input
                class="form-control"
                placeholder="User name"
                v-model="account.name"
              />
            </div>

            <div class="form-group my-3">
              <!-- 當用戶更改<input>、<select>和<textarea> 元素並提交更改時，change事件在這個元素上觸發 -->
              <label for="">大頭貼</label>
              <input
                class="form-control"
                placeholder="profile picture"
                v-model="account.photoURL"
              />
            </div>

            <div class="form-group my-3">
              <button
                type="button"
                class="btn btn-primary"
                style="background-color: cadetblue; border-color:transparent; color:rgb(5, 28, 34);"
                @click="resetName"
              >
                修改資料
              </button>
            </div>

            <div class="form-group my-3">
              <label class="form-label">帳號</label>
              <input
                class="form-control"
                placeholder="帳號"
                v-model="account.account"
              />
            </div>

            <div class="form-group my-3">
              <button
                type="button"
                class="btn btn-primary"
                style="background-color: cadetblue; border-color:transparent; color:rgb(5, 28, 34);"
                @click="resetAccount"
              >
                修改帳號
              </button>
            </div>

            <div class="form-group my-3">
              <label class="form-label">電子信箱</label>
              <input
                class="form-control"
                placeholder="電子信箱"
                v-model="account.email"
              />
            </div>

            <div class="form-group my-3">
              <button
                type="button"
                class="btn btn-primary"
                style="background-color: cadetblue; border-color:transparent; color:rgb(5, 28, 34);"
                @click="resetEmail"
              >
                修改電子信箱
              </button>
            </div>

            <div class="form-group my-3">
              <label for="">密碼</label>
              <input
                class="form-control"
                placeholder="profile picture"
                @change="uploadImage"
                v-model="account.password"
              />
            </div>

            <div class="form-group my-3">
              <button
                type="button"
                class="btn btn-primary"
                style="background-color: cadetblue; border-color:transparent; color:rgb(5, 28, 34);"
                @click="Resetemailandusername"
              >
                修改密碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { fb, db } from '../firebase';
import { fb } from '../firebase';

export default {
  name: 'Profiles',
  data() {
    return {
      profiles: [],
      profile: {
        name: null,
        phone: null,
        address: null,
        postcode: null,
        allDonation: [],
        monthDonation: '',
        yearDonation: '',
        soFarDonation: '',
        remainingPoints: '',
      },
      account: {
        account: null,
        name: null,
        email: null,
        emailVerified: null,
        password: null,
        confirmPassword: null,
        uid: null,
        photoURL: null,
      },
    };
  },
  // firestore() {
  //   const user = fb.auth().currentUser;
  //   return {
  //     profiles: db.collection('profiles').doc(user.uid),
  //   };
  // },
  methods: {
    deleteImage() {
      let image = fb.storage().refFromURL(this.account.photoURL);
      this.account.photoURL = null;
      image
        .delete()
        .then(() => {
          console.log('image delete');
        })
        .catch(() => {
          console.log('an error occurred');
        });
    },
    resetAccount() {
      let token = JSON.parse(localStorage.getItem('token'));
      let bearerToken = 'Bearer ' + token;

      let account = JSON.parse(localStorage.getItem('account'));

      var myHeaders = new Headers();
      myHeaders.append('Authorization', bearerToken);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        account: account,
        newAccount: this.account.account,
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        'https://finalproject-336509.appspot.com/api/Auth/Update/account',
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.msg === '更新帳號成功') {
            window.Swal.fire({
              icon: 'success',
              title: '更新帳號成功',
            });
            localStorage.setItem(
              'account',
              JSON.stringify(this.account.account)
            );
          } else {
            window.Swal.fire({
              icon: 'error',
              title: '錯誤',
            });
          }
        })
        .catch((error) => console.log('error', error));
    },
    resetName() {
      let token = JSON.parse(localStorage.getItem('token'));
      let bearerToken = 'Bearer ' + token;

      // function parseJwt(token) {
      //   var base64Url = token.split('.')[1];
      //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      //   var jsonPayload = decodeURIComponent(
      //     atob(base64)
      //       .split('')
      //       .map(function(c) {
      //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      //       })
      //       .join('')
      //   );
      //   return JSON.parse(jsonPayload);
      // }

      // let payload = parseJwt(token);

      let account = JSON.parse(localStorage.getItem('account'));

      var myHeaders = new Headers();
      myHeaders.append('Authorization', bearerToken);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        account: account,
        newUserName: this.account.name,
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        'https://finalproject-336509.appspot.com/api/Auth/Update/username',
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.msg === '更新使用者名稱成功') {
            window.Swal.fire({
              icon: 'success',
              title: '更新使用者名稱成功',
            });
            this.profile.name = this.account.name;
          } else {
            window.Swal.fire({
              icon: 'error',
              title: '錯誤',
            });
          }
        })
        .catch((error) => console.log('error', error));
    },
    resetEmail() {},
    Resetemailandusername() {
      var user = fb.auth().currentUser;
      user
        .updateEmail(this.account.email)
        .then(() => {
          console.log('success');
          window.Toast.fire({
            type: 'success',
            title: 'Updated it successfully',
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      user
        .updateProfile({
          displayName: this.account.name,
          photoURL: this.account.photoURL,
        })
        .then(function() {
          console.log('success');
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    ResetPasswordEmail() {
      const auth = fb.auth();
      console.log(auth);
      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          window.Toast.fire({
            type: 'success',
            title: 'Email sent',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateProfile() {
      this.$firestore.profiles.update(this.profile);
      (this.profile.name = null),
        (this.profile.phone = null),
        (this.profile.address = null),
        (this.profile.postcode = null);
      window.Toast.fire({
        type: 'success',
        title: 'Updated it successfully',
      });
    },
    addValue() {
      if (this.profile.remainingPoints === '恭喜您將愛心全數捐出') {
        this.profile.remainingPoints = 0;
      }
      this.profile.remainingPoints += 1000;
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        var storageRef = fb.storage().ref('profiles/' + file.name);
        let uploadTask = storageRef.put(file);
        uploadTask.on(
          'state_changed',
          () => {},
          (error) => {
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.account.photoURL = downloadURL;
              console.log('File available at', downloadURL);
            });
          }
        );
      }
    },
  },
  mounted() {
    // const user = fb.auth().currentUser;
    // this.account.photoURL = user.photoURL;
    // this.account.email = user.email;
    let token = JSON.parse(localStorage.getItem('token'));
    let account = JSON.parse(localStorage.getItem('account'));

    // function parseJwt(token) {
    //   var base64Url = token.split('.')[1];
    //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //   var jsonPayload = decodeURIComponent(
    //     atob(base64)
    //       .split('')
    //       .map(function(c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //       })
    //       .join('')
    //   );
    //   return JSON.parse(jsonPayload);
    // }

    // let payload = parseJwt(token);

    var myHeaders = new Headers();
    let bearerToken = 'Bearer ' + token;

    myHeaders.append('Authorization', bearerToken);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://finalproject-336509.appspot.com/api/userdonation/mydata?account=${account}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        let {
          userId,
          // account,
          password,
          userName,
          emailAddress,
          remainingPoints,
        } = result.userData;
        this.profile.name = userName;
        this.profile.postcode = userId;
        this.profile.remainingPoints =
          remainingPoints || '恭喜您將愛心全數捐出';

        this.account.account = account;
        this.account.name = userName;
        this.account.email = emailAddress;
        this.account.password = password;
        this.account.uid = userId;
        this.account.photoURL = 'https://i.pravatar.cc';

        let {
          allDonation,
          monthDonation,
          yearDonation,
          soFarDonation,
        } = result;

        this.profile.allDonation = allDonation;
        this.profile.monthDonation = monthDonation || '正要開始';
        this.profile.yearDonation = yearDonation || '正要開始';
        this.profile.soFarDonation = soFarDonation || '正要開始';
      })
      .catch((error) => console.log('error', error));
  },
};
</script>

<style>
.profiles {
  background: transparent;
}
.form-row input {
  font-size: 1rem;
  font-family: inherit;
  color: inherit;
  padding: 1.5rem 2rem;
  border-radius: 2px;
  border: none;
  border-bottom: 1px solid grey;
  width: 100%;
  display: block;
  transition: all 0.3s;
  background-color: transparent;
}
.form-row > .form-group .btn {
  background-color: cadetblue;
  color: #11122b;
  font-size: 1.25em;
  margin: 10px 25px;
  border-radius: 2px;
  outline: none;
  transition: 0.2s;
  top: 50%;
  left: 50%;
}
.form-row > .form-group {
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding-left: 50px;
}
</style>
