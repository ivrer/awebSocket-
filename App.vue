<template>
  <button @click="sendMessage" class="sendButton" ref="sendRef">send</button>
  <a href="javascipt:void(0)"  v-show="checkSend">"发送无效，连接失败"</a>
</template>

<script setup>

import { ref } from "vue";
import Ws from "./webSocket/ws.js"

let sendRef = ref(null)
let checkSend = ref(false)

let ws = null

function wsConnect(url){
  ws = Ws.create(url)
}
let init = () => {
  ws = Ws.create("ws://localhost:8000",wsConnect )
  console.log(ws,'ws');
}

init()



function sendMessage(){
  checkSend.value = ws.connectionStatus?false:true
  console.log(checkSend,"check");
 ws.connectionStatus&&ws.send(JSON.stringify({
    mode:"MESSAGE",
    msg:"message access"
  }))


}




</script>