<template>
  <div class="Navbar">
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style="background-color: #e3f2fd;"
    >
      <a class="navbar-brand " href="https://aweijiabawei.web.app/"
        ><img
          src="https://ae01.alicdn.com/kf/HTB1zkIyLXXXXXcMXXXXq6xXFXXXd/13-10-4CM-Baby-Pet-Cute-Dog-Cartoon-Window-Decals-Funny-Animal-Car-Sticker-Accessories-Black.jpg_Q90.jpg_.webp"
          alt=""
          width="100"
          height="100"
          class="d-inline-block align-center rounded-circle"
        />
        <h1>阿偉呷飽未</h1>
      </a>
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
      <div class="collapse navbar-collapse " id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active mx-5">
            <router-link to="/" class="nav-link h1" href="#">首頁</router-link>
          </li>
          <li class="nav-item active mx-5">
            <router-link to="/aboutview" class="nav-link h1" href="#"
              >地圖</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
