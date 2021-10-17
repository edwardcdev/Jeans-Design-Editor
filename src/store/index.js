import Vue from 'vue'
import Vuex from 'vuex'

import worn1 from '@/assets/patterns/1.png'
import worn2 from '@/assets/patterns/2.png'
import worn3 from '@/assets/patterns/3.png'
import worn4 from '@/assets/patterns/4.png'
import worn5 from '@/assets/patterns/5.png'
import worn6 from '@/assets/patterns/6.png'
import worn7 from '@/assets/patterns/7.png'
import worn8 from '@/assets/patterns/8.png'
import worn9 from '@/assets/patterns/9.png'
import worn10 from '@/assets/patterns/10.png'
import worn11 from '@/assets/patterns/11.png'
import worn12 from '@/assets/patterns/12.png'


Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    activeJeans: {},
    activeColor: '',
    // jeans list and all other resourses should be fetched from sep config file
    jeans: [{
      colors: ['navy', 'black', 'blue'],
      type: 'woman',
      name: 'a',
      patterns: {
        'worn': [{
          isFront: true,
          index: 0,
          x: 182.86,
          y: 213
        }, {
          isFront: true,
          index: 1,
          x: 201.20,
          y: 382
        }, {
          isFront: true,
          index: 10,
          x: 318.37,
          y: 202
        },{
          isFront: true,
          index: 5,
          x:313,
          y:326.72
        }]
      }
    }, {
      colors: ['navy', 'black', 'blue'],
      type: 'woman',
      name: 'b'
    }, {
      colors: ['navy', 'black', 'blue'],
      type: 'woman',
      name: 'f'
    }, {
      colors: ['navy', 'black', 'blue'],
      type: 'woman',
      name: 'g'
    }, {
      colors: ['navy', 'black', 'blue'],
      type: 'woman',
      name: 'h'
    }, {
      colors: ['navy', 'black', 'blue'],
      type: 'woman',
      name: 'i'
    }, {
      colors: ['navy', 'black', 'blue'],
      type: 'man',
      name: 'c'
    }, {
      colors: ['navy', 'black', 'blue'],
      type: 'man',
      name: 'd'
    }, {
      colors: ['navy', 'black', 'blue'],
      type: 'man',
      name: 'e'
    }],
    patterns: [{
      src: worn1
    }, {
      src: worn2
    }, {
      src: worn3
    }, {
      src: worn4
    }, {
      src: worn5
    }, {
      src: worn6
    }, {
      src: worn7
    }, {
      src: worn8
    }, {
      src: worn9
    }, {
      src: worn10
    }, {
      src: worn11
    }, {
      src: worn12
    }]
  },
  mutations: {
    // this should be done by id
    setJeansType(state, item) {
      state.activeJeans = state.jeans.find((j) => item.jeans.name === j.name);
      state.activeColor = item.color;
    }
  },
  getters: {
    getJeans(state) {
      return state.jeans.map((j) => {
        return {
          ...j
        }
      });
    },
    getPatterns(state) {
      return state.patterns.map(p => {
        return {
          ...p
        }
      });
    },
    getActiveJeans(state) {
      return {
        ...state.activeJeans
        // ...state.jeans[0]
      };
    },
    getActiveColor(state) {
      return state.activeColor;
      // return 'navy';
    }
  }
})

export default store