import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from "@/http"
import md5 from "js-md5"
//引入基本样式
import "./fonts/font.css"
import "swiper/css/swiper.min.css";
import "./model/elementUi"//elementUI组件
import { Uploader,Button,Overlay,Popup} from 'vant';

Vue.use(Uploader);
Vue.use(Button);
Vue.use(Overlay);
Vue.prototype.$http = http;
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
