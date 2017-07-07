const app = new Vue({
  el: '#app',
  data: {
    search : '',
    statuslogin : false
  },
  created () {
    this.checklogin()
  },
  methods: {
    checklogin() {
      if (localStorage.getItem('token') != null || localStorage.getItem('id') != null) {
        this.statuslogin = true
      }
    }
  }
})
