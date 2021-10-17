<template>
  <div class="selector-container">
    <template v-for="(jean,index) in jeans">
      <div :key="'selector-item'+ index" class="select-item-wrapper">
        <div
          class="selector-item"
          :class="{active: index === selectedItemIndex}"
          @click="selectItem(index)"
        >
          <img draggable="false" :src="getJeansImageUrl(jean.name + '-front-navy-washed')" />
        </div>
        <div class="color-container">
          <span
            v-for="(color, index1) in jean.colors"
            :key="index1"
            class="color-box"
            :class="'color-' + color + ' ' + (index1 == selectedColorIndex && index === selectedItemIndex ? 'active' : '')"
            @click="selectColor(index, index1)"
          />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "JeansSelector",
  components: {},
  data() {
    return {
      selectedItemIndex: 0,
      selectedColorIndex: 0
    };
  },
  mounted() {
    this.$store.commit("setJeansType", {
      jeans: this.jeans[this.selectedItemIndex],
      color: this.jeans[this.selectedItemIndex].colors[this.selectedColorIndex]
    });
  },
  computed: {
    jeans() {
      return this.$store.getters.getJeans;
    }
  },
  methods: {
    selectItem(index) {
      this.selectedItemIndex = index;
      this.selectedColorIndex = 0;
      this.$store.commit("setJeansType", {
        jeans: this.jeans[this.selectedItemIndex],
        color: this.jeans[this.selectedItemIndex].colors[
          this.selectedColorIndex
        ]
      });
    },
    selectColor(index, index1) {
      if (index == this.selectedItemIndex) {
        this.selectedColorIndex = index1;
        this.$store.commit("setJeansType", {
          jeans: this.jeans[this.selectedItemIndex],
          color: this.jeans[this.selectedItemIndex].colors[
            this.selectedColorIndex
          ]
        });
      }
    },
    getJeansImageUrl(name) {
      var images = require.context("../assets/jeans", false, /\.png$/);
      return images("./" + name + ".png");
    }
  }
};
</script>

<style lang="scss" scoped>
.selector-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.select-item-wrapper {
  margin-top: 30px;
  .selector-item {
    width: 220px;
    max-width: 220px;
    height: 320px;
    max-height: 320px;
    margin-right: 34px;
    border-radius: 2px;
    border: 1px solid #f1f1ef;
    cursor: pointer;
    &.active {
      border: 2px solid #232323;
      box-sizing: border-box;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
      border-radius: 2px;
    }

    img {
      display: block;
      margin: auto auto;
      width: auto;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .color-container {
    margin-top: 5px;
    display: inline-flex;
    .color-box {
      width: 20px;
      height: 20px;
      margin-right: 5px;
      cursor: pointer;
    }
    .color-box.active {
      border-radius: 50%;
    }
    .color-navy {
      background-color: navy;
    }
    .color-black {
      background-color: black;
    }
    .color-blue {
      background-color: blue;
    }
  }
}
</style>
