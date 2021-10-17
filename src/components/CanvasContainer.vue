<template>
  <div class="main-container">
    <div class="canvas-area">
      <div id="fabric-canvas-front-wrapper" v-show="isFront">
        <canvas id="fabric-canvas-front" :height="canvasHeight" :width="canvasWidth"></canvas>
      </div>
      <div id="fabric-canvas-back-wrapper" v-show="!isFront">
        <canvas id="fabric-canvas-back" :height="canvasHeight" :width="canvasWidth"></canvas>
      </div>
      <div id="canvas-footer">
        <ul class="nav mb-3">
          <li class="nav-item">
            <a
              :class="{'nav-link': true, 'active' : isFront}"
              id="front"
              href="javascript::"
              @click="clickFront"
            >FRONT</a>
          </li>
          <li class="nav-item">
            <a
              :class="{'nav-link': true, 'active' : !isFront}"
              id="back"
              href="javascript::"
              @click="clickBack"
            >BACK</a>
          </li>
        </ul>
      </div>
      <p class="share-group">
        Share this product &nbsp;&nbsp;
        <span class="btn">
          <i class="fa fa-whatsapp"></i>
        </span>
        <span class="btn">
          <i class="fa fa-envelope"></i>
        </span>
        <span class="btn">
          <i class="fa fa-link"></i>
        </span>
      </p>
    </div>
    <div class="controls-container">
      <p>Original Skinny Fit Jeans</p>
      <elementsCalc class="control" :elements="activeElements"></elementsCalc>
      <div class="group">
        <p>Distress</p>
        <p>Use the toggles below to automatically add patterns to your pants.</p>
        <ul class="nav mb-3">
          <li class="nav-item">
            <a
              :class="{'nav-link': true, 'active' : category == 'none'}"
              href="javascript::"
              @click="clickCategory('none')"
            >NONE</a>
          </li>
          <li class="nav-item">
            <a
              :class="{'nav-link': true, 'active' : category == 'worn'}"
              href="javascript::"
              @click="clickCategory('worn')"
            >WORN</a>
          </li>
          <li class="nav-item">
            <a
              :class="{'nav-link': true, 'active' : category == 'destructed'}"
              href="javascript::"
              @click="clickCategory('destructed')"
            >DESTRUCTED</a>
          </li>
          <li class="nav-item">
            <a
              :class="{'nav-link': true, 'active' : category == 'damaged'}"
              href="javascript::"
              @click="clickCategory('damaged')"
            >DAMAGED</a>
          </li>
        </ul>
      </div>
      <elementContainer class="control" :avlbElements="avlbElements"></elementContainer>
      <div class="custom-control custom-checkbox mt-1 mb-2 custom-light-black">
        <input
          type="checkbox"
          class="custom-control-input"
          id="washedSelected"
          v-model="washedSelected"
        />
        <label class="custom-control-label" for="washedSelected">Washed</label>
      </div>
      <!-- <div class="custom-control custom-checkbox mt-1 mb-2 custom-light-black" v-show="isFront">
        <input
          type="checkbox"
          class="custom-control-input"
          id="dyeFrontSelected"
          v-model="dyeFrontSelected"
        />
        <label class="custom-control-label" for="dyeFrontSelected">Dye</label>
      </div>
      <div class="custom-control custom-checkbox mt-1 mb-2 custom-light-black" v-show="!isFront">
        <input
          type="checkbox"
          class="custom-control-input"
          id="dyeBackSelected"
          v-model="dyeBackSelected"
        />
        <label class="custom-control-label" for="dyeBackSelected">Dye</label>
      </div>
      <Compact v-model="colorFront" v-show="isFront"></Compact>
      <Compact v-model="colorBack" v-show="!isFront"></Compact>-->
      <div id="quantity_layout">
        <p id="quantity">QUANTITY</p>
        <div id="quantity_box">
          <ul class="nav mb-3">
            <li class="nav-item">
              <a class="nav-link" id="minus" href="javascript::" @click="decreaseQuantity">
                <span>-</span>
              </a>
            </li>
            <li>
              <input type="text" id="quantity_number" v-model="quantity" />
            </li>
            <li class="nav-item">
              <a class="nav-link" id="plus" href="javascript::" @click="increaseQuantity">+</a>
            </li>
            <li>
              <button class="btn btn-secondary" id="add-cart">ADD TO CART</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fabric from "fabric";
import elementsCalc from "@/components/elementsCalc";
import elementContainer from "@/components/elementContainer";
import { Compact } from "vue-color";

export default {
  name: "DrawArea",
  components: {
    Compact,
    elementsCalc,
    elementContainer
  },
  data() {
    return {
      category: "none",
      quantity: 0,
      jeans: null,
      color: "",
      canvasWidth: 600,
      canvasHeight: 750,
      objScale: 1,
      patternScale: 0.5,
      canvasFront: null,
      canvasBack: null,
      jeansFront: null,
      jeansBack: null,
      jeansFrontClip: null,
      jeansBackClip: null,
      frontElements: [],
      backElements: [],
      brushSelected: false,
      washedSelected: true,
      dyeFrontSelected: false,
      dyeBackSelected: false,
      brush: null,
      pattern: null,
      dyeFrontFilter: null,
      dyeBackFilter: null,
      colorFront: {
        rgba: { r: 25, g: 77, b: 51, a: 1 }
      },
      colorBack: {
        rgba: { r: 25, g: 77, b: 51, a: 1 }
      },
      isFront: true,
      avlbElements: []
    };
  },
  mounted() {
    // console.log("===============CanvasContainer Mount======================");
    this.jeans = this.$store.getters.getActiveJeans;
    this.color = this.$store.getters.getActiveColor;
    this.avlbElements = this.$store.getters.getPatterns;
    this.canvasFront = new fabric.Canvas("fabric-canvas-front");
    this.canvasBack = new fabric.Canvas("fabric-canvas-back");
    this.canvasFront.selection = false;
    this.canvasBack.selection = false;
    this.canvasFront.setBackgroundColor("#F1F1EF");
    this.canvasBack.setBackgroundColor("#F1F1EF");
    let comp = this;

    fabric.filterBackend = fabric.initFilterBackend();

    try {
      let webglBackend = new fabric.WebglFilterBackend();
      fabric.filterBackend = webglBackend;
    } catch (e) {
      let canvas2dBackend = new fabric.Canvas2dFilterBackend();
      fabric.filterBackend = canvas2dBackend;
    }

    fabric.Image.fromURL(
      comp.getFrontImageUrl,
      function(img) {
        comp.jeansFront = img;
        comp.canvasFront.add(comp.jeansFront).renderAll();
        comp.jeansFront.center();
        img.on("drop", opt => {
          let src = opt.e.dataTransfer.getData("img/src");
          comp.addTear(src, opt.e.layerX, opt.e.layerY);
        });

        fabric.loadSVGFromURL(comp.getFrontSvgUrl, function(objects, options) {
          comp.jeansFrontClip = fabric.util.groupSVGElements(objects, options);

          comp.jeansFrontClip.set({
            left: comp.jeansFront.left,
            top: comp.jeansFront.top,
            absolutePositioned: true
          });
        });
      },
      {
        selectable: false,
        hoverCursor: "default",
        scaleX: this.objScale,
        scaleY: this.objScale
      }
    );

    fabric.Image.fromURL(
      comp.getBackImageUrl,
      function(img) {
        comp.jeansBack = img;
        comp.canvasBack.add(comp.jeansBack).renderAll();
        comp.jeansBack.center();
        img.on("drop", opt => {
          let src = opt.e.dataTransfer.getData("img/src");
          comp.addTear(src, opt.e.layerX, opt.e.layerY);
        });

        fabric.loadSVGFromURL(comp.getBackSvgUrl, function(objects, options) {
          comp.jeansBackClip = fabric.util.groupSVGElements(objects, options);

          comp.jeansBackClip.set({
            left: comp.jeansBack.left,
            top: comp.jeansBack.top,
            absolutePositioned: true
          });
        });
      },
      {
        selectable: false,
        hoverCursor: "default",
        scaleX: this.objScale,
        scaleY: this.objScale,
        perPixelTargetFind: true
      }
    );

    this.dyeFrontFilter = new fabric.Image.filters.BlendColor({
      color: "#000000",
      mode: "add",
      alpha: 0.5
    });

    this.dyeBackFilter = new fabric.Image.filters.BlendColor({
      color: "#000000",
      mode: "add",
      alpha: 0.5
    });
  },
  watch: {
    washedSelected(newVal) {
      this.washedSelected = newVal;
      var comp = this;
      if (comp.jeansFront) {
        comp.jeansFront.setSrc(comp.getFrontImageUrl, function() {
          comp.canvasFront.renderAll();
        });
      }
      if (comp.jeansBack) {
        comp.jeansBack.setSrc(comp.getBackImageUrl, function() {
          comp.canvasBack.renderAll();
        });
      }
    },
    dyeFrontSelected(newVal) {
      if (newVal) {
        this.activeJeans.filters[0] = this.dyeFilter;
      } else {
        this.activeJeans.filters[0] = null;
      }
      this.activeJeans.applyFilters();
      this.activeCanvas.renderAll();
    },
    dyeBackSelected(newVal) {
      if (newVal) {
        this.activeJeans.filters[0] = this.dyeFilter;
      } else {
        this.activeJeans.filters[0] = null;
      }
      this.activeJeans.applyFilters();
      this.activeCanvas.renderAll();
    },
    colorFront(newVal) {
      this.dyeFilter.color = newVal.hex;
      if (this.dyeSelected) {
        this.activeJeans.applyFilters();
        this.activeCanvas.renderAll();
      }
    },
    colorBack(newVal) {
      this.dyeFilter.color = newVal.hex;
      if (this.dyeSelected) {
        this.activeJeans.applyFilters();
        this.activeCanvas.renderAll();
      }
    }
  },
  computed: {
    getFrontImageUrl() {
      if (this.washedSelected) {
        return this.getJeansImageUrl(
          this.jeans.name + "-front-" + this.color + "-washed"
        );
      } else {
        return this.getJeansImageUrl(
          this.jeans.name + "-front-" + this.color + "-non-washed"
        );
      }
    },
    getFrontSvgUrl() {
      return this.getJeansSvgUrl(this.jeans.name + "-front");
    },
    getBackImageUrl() {
      if (this.washedSelected) {
        return this.getJeansImageUrl(
          this.jeans.name + "-back-" + this.color + "-washed"
        );
      } else {
        return this.getJeansImageUrl(
          this.jeans.name + "-back-" + this.color + "-non-washed"
        );
      }
    },
    getBackSvgUrl() {
      return this.getJeansSvgUrl(this.jeans.name + "-back");
    },
    activeCanvas() {
      return this.isFront ? this.canvasFront : this.canvasBack;
    },
    activeElements() {
      return this.isFront ? this.frontElements : this.backElements;
    },
    activeJeans() {
      return this.isFront ? this.jeansFront : this.jeansBack;
    },
    dyeFilter() {
      return this.isFront ? this.dyeFrontFilter : this.dyeBackFilter;
    },
    dyeSelected() {
      return this.isFront ? this.dyeFrontSelected : this.dyeBackSelected;
    },
    jeansClip() {
      return this.isFront ? this.jeansFrontClip : this.jeansBackClip;
    }
  },
  methods: {
    getJeansImageUrl(name) {
      var images = require.context("../assets/jeans", false, /\.png$/);
      return images("./" + name + ".png");
    },
    getJeansSvgUrl(name) {
      var images = require.context("../assets/jeans", false, /\.svg$/);
      return images("./" + name + ".svg");
    },
    clickCategory(category) {
      this.category = category;

      var comp = this;
      if (this.category == "none") {
        this.removeAll();
      } else if (this.category == "worn") {
        if ("worn" in this.jeans.patterns) {
          this.removeAll();
          this.jeans.patterns.worn.forEach(function(pattern, index) {
            if (comp.isFront == pattern.isFront) {
              var element = comp.avlbElements[pattern.index];
              comp.addTear(element.src, pattern.x, pattern.y, "Pattern", 2.5, true);
            }
          });
        }
      }
    },
    clickFront() {
      this.isFront = true;
    },
    clickBack() {
      this.isFront = false;
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      this.quantity--;
      if (this.quantity < 0) this.quantity = 0;
    },
    addTear(
      src = "",
      x = 200,
      y = 100,
      name = "simple tear",
      price = 2.5,
      isFromCategory = false
    ) {
      let comp = this;
      fabric.Image.fromURL(
        src,
        function(img) {
          img.__name = name;
          img.__price = price;
          img.clipPath = comp.jeansClip;

          if (img.width > img.height) {
            img.scaleToWidth(80);
          } else {
            img.scaleToHeight(80);
          }

          img.perPixelTargetFind = true;

          if (!isFromCategory) {
            img.set({
              selectable: true,
              left: x - img.getScaledWidth() / 2,
              top: y - img.getScaledHeight() / 2
            });
          } else {
            img.set({
              selectable: true,
              left: x,
              top: y
            });
          }
          comp.activeCanvas.setActiveObject(img);

          comp.activeElements.push(img);

          img.on("mousedblclick", function() {
            comp.activeCanvas.remove(img);
            comp.activeElements.splice(comp.activeElements.indexOf(img), 1);
            comp.activeCanvas.renderAll();
          });

          img.on("moving", function(opt) {
            let point = new fabric.Point(opt.pointer.x, opt.pointer.y);
            if (comp.pointInsideObj(comp.activeJeans, point)) {
              img.__fallbackPoint = point;
            } else if (img.__fallbackPoint != undefined) {
              img.set({
                left: img.__fallbackPoint.x - img.getScaledWidth() / 2,
                top: img.__fallbackPoint.y - img.getScaledHeight() / 2
              });
              comp.activeCanvas.renderAll();
            }
          });
          comp.activeCanvas.add(img);
          comp.activeCanvas.renderAll();
        },
        {
          transparentCorners: false,
          cornerColor: "rgb(123, 152, 250)",
          cornerStrokeColor: "rgb(123, 152, 250)",
          borderColor: "rgb(123, 152, 250)",
          cornerSize: 12,
          cornerStyle: "circle"
        }
      );
    },
    pointInsideObj(objToCheck, pointer) {
      var pointerToUse =
        objToCheck.group && objToCheck.group.type !== "activeSelection"
          ? this.activeCanvas._normalizePointer(objToCheck.group, pointer)
          : pointer;
      return this.activeCanvas._checkTarget(pointerToUse, objToCheck, pointer);
    },
    removeAll() {
      for (let i = 0; i < this.activeElements.length; i++) {
        this.activeCanvas.remove(this.activeElements[i]);
      }
      this.activeElements.splice(0, this.activeElements.length);
      this.activeCanvas.renderAll();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  margin: 0 auto 120px;
  margin-bottom: 120px;
}

.control {
  margin-bottom: 10px;
  width: 200px;
  font-size: 14pt;
  border-radius: 13px;
}

.controls-container {
  width: 555px;
  display: flex;
  flex-direction: column;
  margin-left: 5%;
}

.controls-container > p:first-child {
  z-index: 3;
  margin: 0;
  height: 30px;
  color: #030303;
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;
}

.group > p:first-child {
  margin-top: 5px;
  color: #33333a;
  font-size: 14px;
  font-weight: 400;
  line-height: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
  z-index: 5;
  text-align: justify;
  margin-bottom: 5px;
}

.group > p:nth-child(2) {
  z-index: 5;
  color: #666666;
  font-size: 16px;
  line-height: 20px;
  text-align: justify;
}

.group {
  font-weight: 400;
  z-index: 4;
  width: 555px;
  padding: 10px 0 0 0;
  box-shadow: 0px 2px #f9f8f6, 0px -2px #f9f8f6;
}

.nav-link {
  text-align: center;
  width: 110px;
  margin-right: 28.75px;
  // width: 138.75px;
  color: #666666;
  font-size: 12px;
  border-radius: 0;
  border: 1px solid #dddddd;
}

.nav-link.active {
  background-color: #f3f3f3;
  color: #666666;
}

#quantity {
  margin-top: 5px;
  color: #33333a;
  font-size: 14px;
  font-weight: 400;
  line-height: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
}

#add-cart {
  margin-left: 30px;
  width: 200px;
  height: 36px;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 2px;
  color: #ffffff;
  border-radius: 0;
  background-color: #232323;
}

#minus,
#plus {
  margin-right: 0;
  width: 36px;
  height: 36px;
  padding-top: 0;
  padding-left: 5px;
  padding-right: 5px;
  line-height: 30px;
  text-align: center;
  font-size: 30px;
  background-color: #f3f3f3;
}

#quantity_number {
  height: 36px;
  width: 40px;
  text-align: center;
}

#canvas-footer {
  margin-top: 25px;
  padding-left: 90px;
}

#front {
  margin-left: 70px;
}

.creation-footer > span {
  color: #666666;
  font-size: 14px;
}

.creation-footer {
  margin-top: 30px;
}

.share-group {
  margin-left: -150px;
  height: 40px;
  color: #666666;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  text-align: justify;
  span {
    i {
      font-size: 20px;
      color: #666666;
    }
  }
}

#quantity_layout {
  margin-top: 15px;
  box-shadow: 0px -2px #f9f8f6;
}

.custom-light-black {
  color: #33333a;
}

.custom-control-label {
  color: #33333a;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
