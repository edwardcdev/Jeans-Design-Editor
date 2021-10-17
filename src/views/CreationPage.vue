<template>
  <div class="creation-layout">
    <div class="step">
      <div class="step-number">{{currentStep}}</div>
      <div class="step-description">{{currentDescription}}</div>
      <img :src="content.arrowSVG" id="left-arrow" @click="stepPrev" />
      <img :src="content.arrowSVG" id="right-arrow" @click="stepNext" />
    </div>
    <transition :name="transitionName">
      <router-view class="creator-container" />
    </transition>
  </div>
</template>

<script>
import arrowSVG from "@/assets/creatorPage/arrow.svg";

export default {
  name: "Creator",
  components: {},
  data() {
    return {
      content: {
        arrowSVG
      },
      transitionName: "slide-left"
    };
  },
  mounted() {},
  computed: {
    currentStep() {
      return this.$route.meta.step;
    },

    countSteps() {
      let r = this.$router.options.routes.find(r => r.path === "/create")
        .children.length;
      return r;
    },

    currentDescription() {
      return this.$route.meta.desc;
    }
  },
  methods: {
    stepNext() {
      let to = this.currentStep;
      to = to >= this.countSteps ? "/" : to;
      this.$router.push(String(to));
    },

    stepPrev() {
      let to = this.currentStep - 2;
      to = to < 0 ? "/" : to;
      this.$router.push(String(to));
    }
  }
};
</script>

<style>
body {
  background-color: white;
}

.creation-layout {
  background: #e5e5e5;
  width: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
}

.creator-container {
  position: absolute;
  top: 190px;
  left: 122px;
  width: 83%;
  position: absolute;
}

.step-number {
  position: absolute;
  width: 17px;
  height: 48px;
  left: 122px;
  top: 130px;

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 48px;

  color: #9c9c9c;
}

.step-description {
  position: absolute;
  width: 437px;
  height: 48px;
  left: 147px;
  top: 130px;

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 48px;
  /* identical to box height */
  color: #232323;
}

#left-arrow {
  position: absolute;
  width: 31px;
  height: 31px;
  left: 59px;
  top: 140px;
}

#right-arrow {
  position: absolute;
  width: 31px;
  height: 31px;
  right: 59px;
  top: 140px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
}
</style>
