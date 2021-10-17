<template>
  <div class="lander-layout">
    <img class="logo-image" :src="logoJeans" />

    <span class="caption-main">Custom jeans have become more affordable!</span>
    <span
      class="caption-sub">Website that allows you to design the distressing of an old pair of jeans to make them trendy/feel new (at an affordable cost). This is a sustainable innovation that can take advantage of the millions of pairs of denim that are sitting in the back of people’s closets.</span>
    <router-link to="create/0" class="start-button">
      <div>Create Your Jeans</div>
    </router-link>
  </div>
</template>

<script>
import logoJeans from "@/assets/landerPage/image7.png";

export default {
  name: "Lander",
  components: {},
  data() {
    return {
      logoJeans
    };
  }
};
</script>


<style lang="scss" scoped>
.lander-layout {
  background: #e5e5e5;
  width: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
}

.caption-main {
  position: absolute;
  max-width: 710px;
  height: 132px;
  left: 122px;
  top: 200px;

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 54px;
  line-height: 120%;
  color: #232323;
}

.caption-sub {
  position: absolute;
  max-width: 571px;
  height: 129px;
  left: 122px;
  top: 364px;

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 180%;
  /* or 29px */

  color: #3e3e3e;
}

.logo-image {
  position: absolute;
  width: auto;
  right: 0;
  top: 120px;
}

.gradient-rect {
  position: absolute;
  width: 251px;
  height: 950px;
  left: 381px;
  top: 120px;
  background: linear-gradient(
    266.89deg,
    #f9f9f9 7.42%,
    rgba(255, 255, 255, 0) 92.21%
  );
}

.start-button {
  position: absolute;
  width: 345px;
  height: 74px;
  left: 122px;
  top: 553px;
  background: #232323;
  border-radius: 2px;
  text-decoration: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  & div {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    text-align: center;
    letter-spacing: 0.08em;
    color: #ffffff;
    height: auto;
  }
}

</style>
