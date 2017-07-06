Vue.component('navbar', {
  data: function() {
    // return { visible: false },
    return {
      activeIndex: '1'
    }
  },
  template: `
  <div class="navbar">
    <div class="line"></div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">Home</el-menu-item>
        <el-submenu index="2">
          <template slot="title">Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">Sign In</el-menu-item>
      </el-menu>
  </div>`,
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
})

Vue.component('speech', {
  template: `
  <div class="speech">
    <el-row>
      <el-col :span="8" :offset="8">
        <div id="info">

        </div>
        <div class="right">
          <button id="start_button" onclick="startButton(event)">
            <img id="start_img" src="/img/mic.gif" alt="Start"></button>
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
    <input id="pac-input" class="controls" type="text" placeholder="Search Box">
    <div id="map"></div>
    <ul id="places"></ul>
  </div>
  `
})
