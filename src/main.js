import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
// import { createApp } from 'vue'
// import App from './App.vue'
// import firebase from 'firebase'
// createApp(App).mount('#app')
// import { initializeApp } from "firebase/app";
// const firebaseConfig = {
//   apiKey: "AIzaSyDnID31w3NDNi96G-1ImjJ-5Iuz3j775zs",
//   authDomain: "surveasy-workspace.firebaseapp.com",
//   databaseURL: "https://surveasy-workspace-default-rtdb.firebaseio.com",
//   projectId: "surveasy-workspace",
//   storageBucket: "surveasy-workspace.appspot.com",
//   messagingSenderId: "1077091709710",
//   appId: "1:1077091709710:web:f73e3ff82e2c950387dd5f",
//   measurementId: "G-K6BR16KCKQ"
// };
// firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);

