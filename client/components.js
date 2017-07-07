
Vue.component('navbar', {
  data: function() {
    // return { visible: false },
    return {
      activeIndex: '1',
      statuslogin: false
    }
  },
  created () {
    this.checklogin()
  },
  template: `
  <div v-if="statuslogin">
    <div class="navbar">
      <div class="line"></div>
        <el-menu-item index="3"><a href="index.html">Home</a></el-menu-item>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
          <el-menu-item index="1"><a href="index.html">Home</a></el-menu-item>
          <el-menu-item index="3" @click=logout()><a>Sign Out</a></el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="navbar">
      <div class="line"></div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="3"><a href="signin.html">Sign In</a></el-menu-item>
        <el-menu-item index="4"><a href="signup.html">Sign Up</a></el-menu-item>
      </el-menu>
      </div>
    </div>
  </div>
`,
// created: function(){
//   var token = localStorage.getItem('token')
//   var id = localStorage.getItem('id')
//
//   if(token !== null ) {
//     this.statusLogin = true
//   } else if (id !== null) {
//
//   }
// },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('id')
      window.location.href = "signin.html"
    },
    checklogin () {
      if (localStorage.getItem('token') != null || localStorage.getItem('id') != null) {
        this.statuslogin = true
        // window.location.href = "index.html"

      }
    }
  }
})



Vue.component('speech', {
  props: ['search'],
  template: `
  <div class="speech">
    <el-row>
      <el-col :span="8" :offset="8">
        <div id="info">
        </div>
        <div class="right">
          <button id="start_button" onclick="startButton(event)">
            <img id="start_img" src="img/mic.gif" alt="Start"></button>
        </div>
        <div id="results">
          <span id="final_span" class="final"></span>
          <span id="interim_span" class="interim"></span>
          <p></p>
        </div>
        <div class="center">

          <p></p>
          <div id="div_language">
            <select id="select_language" onchange="updateCountry()"></select>

            &nbsp;&nbsp;
            <select id="select_dialect"></select>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  `
})

Vue.component('map-result', {
  template: `
  <div class="map-result">
  <input id="origin-input" class="controls" type="text" value="Your position"
      placeholder="Enter an origin location" hidden="true">

  <div id="mode-selector" class="controls">
    <input type="radio" name="type" id="changemode-walking" checked="checked">
    <label for="changemode-walking">Walking</label>

    <input type="radio" name="type" id="changemode-transit">
    <label for="changemode-transit">Transit</label>

    <input type="radio" name="type" id="changemode-driving">
    <label for="changemode-driving">Driving</label>
  </div>
  <input id="mapinput" class="controls" type="text" placeholder="Search Box">
  <div id="map"></div>
  <ul id="places"></ul>
  </div>
  `
})

Vue.component('form-signup', {
  data() {
     return {
       form: {
         name: '',
         gender: '',
         email: '',
         username: '',
         password: '',
       }
     }
   },
   methods: {
     onSubmit() {
       console.log('submit!');
       var self=this;
       axios.post('http://localhost:3000/users/signup', {
          name: self.form.name,
          gender: self.form.gender,
          email: self.form.email,
          username: self.form.username,
          password: self.form.password

        })
        .then(function (response) {
          self.form.name = ''
          self.form.gender = ''
          self.form.email = ''
          self.form.username = ''
          self.form.password = ''
          alert('login berhasil')
          window.location.href = "signin.html"
          console.log(response.data);

        })
        .catch(function (error) {
          console.log(error);
        });
     }
   },
  template: `
  <div class="form-signup">
  <el-row>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <div class="grid-content bg-purple">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Gender">
          <el-select v-model="form.gender" placeholder="please select your gender">
            <el-option label="male" value="male"></el-option>
            <el-option label="female" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>

  </el-row>
  </div>
  `
})


Vue.component('form-signin',{
  data() {
      var validaePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validaeUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the username again'));
        } else if (value !== this.ruleForm2.username) {
          callback(new Error('please input username correctly!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          username: '',
          checkPass: ''
        },
        rules2: {
          username: [
            { validator: validaePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validaeUserName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            var self = this
            axios.post('http://localhost:3000/users/signin', {
              username : self.ruleForm2.username,
              password : self.ruleForm2.checkPass
            })
            .then(function(response) {
              console.log('ini responnya : ',response.data);
              localStorage.setItem('token', response.data)
              window.location.href = "index.html"
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  template:`

  <div class="form-signin">
  <el-row>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
      <el-form-item label="Username" prop="username">
        <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">Submit</el-button>
        <el-button @click="resetForm('ruleForm2')">Reset</el-button>
      </el-form-item>
    </el-form>
    </el-col>
  </el-row>
  </el-row>

  </div>
  `
})
