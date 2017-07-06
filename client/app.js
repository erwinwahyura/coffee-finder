new Vue({
  el: '#app',
  data: function() {
    // return { visible: false },
    return { activeIndex: '1'}
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
})
