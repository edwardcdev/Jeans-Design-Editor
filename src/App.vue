<template>
  <div>
    <a
      href="javascript::"
      class="d-block px-3 text-center text-bold text-white top-header"
    >International Shipping available! Free shipping for orders above $150</a>
    <nav class="navbar navbar-expand-md navbar-custom">
      <span class="navbar-brand logo-text">distress em</span>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-header"
        aria-controls="navbar-header"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse ml-5" id="navbar-header">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="shop_dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Design</a>
            <div class="dropdown-menu" aria-labelledby="shop_dropdown">
              <a class="dropdown-item" href="#">Shop</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="fabric_dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Fabric</a>
            <div class="dropdown-menu" aria-labelledby="fabric_dropdown">
              <a class="dropdown-item" href="#">Fabric</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="about_dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >About</a>
            <div class="dropdown-menu" aria-labelledby="about_dropdown">
              <a class="dropdown-item" href="#">About</a>
            </div>
          </li>
        </ul>
      </div>
      <span class="navbar-brand welcome-alex">
        WELCOME MIKHAEL
        <img :src="notificationImage" class="notificatio-img" />
      </span>
    </nav>
    <div class="main-view">
      <transition :name="transitionName">
        <router-view />
      </transition>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-2 footer-item">
            <h4>Categories</h4>
            <ul>
              <li>
                <a href="#">About US</a>
              </li>
              <li>
                <a href="#">Testimonials</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div class="col-md-2 footer-item">
            <h4>Partners</h4>
            <ul>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Shipping & Returns</a>
              </li>
              <li>
                <a href="#">Size Guide</a>
              </li>
              <li>
                <a href="#">Product Care</a>
              </li>
            </ul>
          </div>
          <div class="col-md-2 footer-item">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <a href="#">
                  123 Fake St
                  <br />New York, NY 10932
                </a>
              </li>
              <li>
                <a href="#">
                  <br />
                  <br />+01 555 5462
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-6 footer-item">
            <h4>Subscribe to newsletter</h4>
            <form class="form-inline" method="post">
              <div class="form-group">
                <input
                  type="email"
                  class="form-control input-sm input-inverse col-md-7"
                  name="email"
                  required
                  placeholder="ENTER YOUR EMAIL"
                  id="email"
                />
                <div class="input-group-btn col-md-3">
                  <button
                    class="btn btn-light"
                    type="submit"
                    role="button"
                    id="subscribe-btn"
                  >SUBSCRIBE</button>
                </div>
              </div>
            </form>
            <p class="social-group">
              <span class="btn">
                <i class="fa fa-facebook"></i>
              </span>
              <span class="btn">
                <i class="fa fa-twitter"></i>
              </span>
            </p>
          </div>
        </div>
        <div class="row">
          <h4 class="col-md-12 text-center footer-logo">© Copyright Distress 'Em Jeans 2019</h4>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import notificationImage from "@/assets/notification.svg";

export default {
  name: "App",
  data() {
    return {
      notificationImage: notificationImage,
      transitionName: "slide-left"
    };
  },
  watch: {
    $route(to, from) {
      const toStep = to.path.split("/").length;
      const fromStep = from.path.split("/").length;
      this.transitionName = toStep < fromStep ? "slide-right" : "slide-left";
    }
  }
};
</script>

<style  lang="scss">
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.6s ease;
}

.slide-left-leave-to,
.slide-right-enter {
  transform: translate(-1440px);
}

.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(1440px);
}

body {
  margin: 0;
}

.logo {
  position: absolute;
  width: 114px;
  height: 22px;
  left: 122px;
  top: 40px;

  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 130%;
  /* or 23px */
  color: #494949;
}

html {
  position: relative;
  min-height: 100%;
}

.top-header {
  background-color: #1d1d1d;
  height: 40px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  text-decoration: none !important;
  padding-top: 13px !important;
}

.navbar-custom {
  height: 80px;
  background: #ffffff;
  box-shadow: 0px 1px rgba(0, 0, 0, 0.1);
}

.navbar-custom .navbar-brand,
.navbar-custom .navbar-text {
  color: black;
}

.navbar-custom .navbar-nav .nav-link {
  font-size: 13px;
  font-weight: 400;
  padding-top: 12px;
  margin-right: 25px;
  height: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #33333a;
}

.navbar-custom .nav-item.active .nav-link,
.navbar-custom .nav-item:hover .nav-link {
  color: #ff5e1b;
}

.logo-text {
  margin-left: 110px;
  height: 45px;
  font-size: 30px;
  font-weight: 400;
  line-height: 40px;
  text-align: center;
  color: black;
}

.welcome-alex {
  color: #33333a;
  font-size: 12px;
  font-weight: 400;
  line-height: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-right: 120px;
}

.notificatio-img {
  margin-top: -5px;
}

.footer {
  width: 100%;
  height: 300px;
  background: #33333a;

  .container {
    max-width: 100%;
    padding-left: 150px;
    padding-right: 120px;
    padding-top: 50px;

    .footer-item {
      .form-group {
        width: 100%;
        margin-top: 10px;
      }

      #email {
        border-radius: 0px;
        height: 40px;
        background-color: #33333a;
        border: solid 1px #666666;
      }

      #subscribe-btn {
        border-radius: 0px !important;
        height: 40px;
        color: #33333a;
        font-size: 12px;
        font-weight: 400;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 2px;
        width: 100%;
      }

      h4 {
        color: white;
        font-size: 18px;
        font-weight: 400;
        line-height: 30px;
        margin-bottom: 15px;
      }

      ul {
        list-style: none;
        padding: 0px;

        li {
          height: 20px;
          padding: 5px 4px;
          margin-bottom: 5px;

          a {
            font-size: 14px;
            font-weight: 400;
            line-height: 25px;
            color: #dedede;
            text-decoration: none;
          }
        }
      }
    }
  }
}

.social-group {
  margin-top: 20px;
  .btn {
    width: 30px;
    height: 30px;
    padding: 0px;
    border-radius: 50%;
    background: #b2b2b2;
    margin-right: 20px;
    i {
      margin-left: 0px;
      margin-top: 6px;
    }
  }
}

.footer-logo {
  margin-top: 10px;
  height: 25px;
  color: #dedede;
  font-size: 15px;
  font-weight: 400;
  line-height: 25px;
}

.main-view {
  min-height: 950px;
  width: 100%;
}

.vc-compact {
  width: 550px !important;
  box-shadow: none !important;
  background-color: transparent !important;
  .vc-compact-color-item {
    width: 35px;
    height: 25px;
  }
  .vc-compact-dot {
    position: absolute;
    top: 5px;
    left: 10px;
    width: 15px;
    height: 15px;
  }
}
</style>
