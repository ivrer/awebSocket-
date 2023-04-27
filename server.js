const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 8000 })

server.on("connection", handleConnection)

//控制连接的回调函数，接受实例
function handleConnection(ws) {
    //服务器打开
    console.log("---server open Suceess port 8000---");

    ws.send(
        JSON.stringify({
            mode:"MESSAGE",
            msg:"server open"
        })
    )

    //监听连接打开,事件参数都是ws的实例
    ws.on("open", handleOpen)

    //监听错误
    ws.on("error", handleError)

    //监听接受消息
    ws.on("message", handleMessage)

    //监听连接关闭
    ws.on("close",handleClose)
}

function handleOpen(ws){
   console.log("--server websocket open--")

}

//tdtrrasdasdas
function handleMessage(data){
    const {mode,msg} = JSON.parse(data)
    console.log("message has arrived",JSON.parse(data));
    switch(mode){
        case "HEARTBEAT":
            this.send(JSON.stringify(
                {
                    mode:"HEARTBEAT",
                    msg:"heartBeat"
                }
            ))
        break;
        case "MESSAGE":
            this.send(JSON.stringify(
                {
                    mode:"MESSAGE",
                    ms:"server msg"
                }
            ))
        default:
            break;
    }
 

}


function handleError(error){
    console.log("webSocket has some error" ,error)
}

function handleClose(code){
    console.log("--websocket closed");
}