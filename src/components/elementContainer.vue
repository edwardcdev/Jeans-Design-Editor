<template>
  <div>
    <p id="pattern">Patterns</p>
    <div class="drag-container">
      <template v-for="(element,index) in avlbElements">
        <div
          class="element"
          :key="'dragelem'+ index"
          draggable="true"
          @dragstart="dragStart($event,element)"
        >
          <img :src="element.src" draggable="false" class="element-img" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "elementsContainer",
  props: ["avlbElements"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    dragStart(e, elem) {
      e.dataTransfer.setData("img/src", elem.src);
    }
  }
};
</script>

<style lang="scss" scoped>
.drag-container {
  width: 555px;
  display: flex;
  flex-direction: row;
  flex-wrap: true;
  padding-top: 10px;
  box-shadow: 0px 2px #f9f8f6;
  flex-wrap: wrap;
  min-height: 100px;
}
.element {
  width: 80px;
  height: 80px;
  vertical-align: middle;
  margin-right: 20px;
  margin-bottom: 10px;
  display: flex;
  cursor: pointer;
}

#pattern {
    margin-top: 10px;
    color: #33333a;
    font-size: 14px;
    font-weight: 400;
    line-height: 40px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0px;
}

.element-img {
  display: block;
  margin: auto auto;
  max-width: 80px;
  max-height: 80px;
}
</style>
