<template>
  <div id="price_wrapper">
  $ {{totalPrice}}
  <!-- <div class="box">
    <ul>
      <li v-for="(element,index) in elements" :key="'calcElement'+index">
          {{element.__name}}: {{element.__price ? element.__price+"$" : "FREE"}}
      </li>
    </ul>
  </div> -->
</div>
</template>

<script>
export default {
  name: 'elementsCalc',
  props: ["elements"],
  data(){
    return{

    }
  },
  computed:{
    totalPrice(){
      let sum = 0;
      for(let i=0; i<this.elements.length; i++){
        if(this.elements[i].__price)
          sum+=this.elements[i].__price;
      }
      return sum;
    }
  }

}
</script>

<style>
  .box{
    overflow:scroll;
    height:100px;
    border: 4px solid black ;
  }

  #price_wrapper {
    z-index: 3;
    width: 89.4px;
    height: 30px;
    color: #ff6008;
    font-size: 24px;
    font-weight: 400;
    line-height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

</style>
