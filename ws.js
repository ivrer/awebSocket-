let heartBeatTimer = null
let reconnectTimer = null

const WS_MODE = {
    MESSAGE:"MESSAGE",
    HEARTBEAT:"HEARTBEAT"
}
class Ws extends WebSocket{

    constructor(url,WsConnnect){
        super(url)
        this.wsUrl = url
        this.connectionStatus = false
        this.WsConnnect = WsConnnect
        this.init()

    }

    init(){
        this.bindEvent()
    }

    bindEvent(){
        this.addEventListener("open",this.handleOpen,false)
        this.addEventListener("message",this.handleMessage,false)
        this.addEventListener("error",this.handleError,false)
        this.addEventListener("close",this.handleClose,false)
    }
    handleOpen(){
        console.log("--web websocket opened");
        this.connectionStatus = true
        this.startHeartBeat()
    }
    handleError(e){
        console.log("--web webSocket error",e);
        this.connectionStatus = false
        this.reconnect()
    }
    handleMessage(e){
        let {mode,msg} = JSON.parse(e.data)
    
        switch(mode){
            case WS_MODE.HEARTBEAT:
                this.connectionStatus = true;
                this.startHeartBeat()
                break;
            case WS_MODE.MESSAGE:
                console.log("----NESSAGE---");
                break;
            default:
                break;
        }

    }
    heartBeat(){         
        heartBeatTimer= setInterval(() => {
        if(this.connectionStatus){
            this.send(JSON.stringify({
                mode:WS_MODE.HEARTBEAT,
                msg:"heartBeat"
            }))
            console.log("heart beat");
            this.connectionStatus = false

        }else{
            this.reconnect()
        }
        },4000)
    }
        
    
    startHeartBeat(){
        clearInterval(heartBeatTimer)
        heartBeatTimer = null
        this.heartBeat()
    }
    handleClose(){
        console.log("--web socket closed");
        this.connectionStatus = false
        if(heartBeatTimer){
            
            clearTimeout(heartBeatTimer)
            heartBeatTimer = null
        }

        if(reconnectTimer){
            clearTimeout(reconnectTimer)
            reconnectTimer = null
        }

        this.reconnect()
    }
    reconnect(){

        if(heartBeatTimer){
            clearInterval(heartBeatTimer)
            heartBeatTimer = null
        }

        if(reconnectTimer){
            clearTimeout(reconnectTimer)
            reconnectTimer = null
        }

    
        reconnectTimer = setTimeout(() => {
            this.WsConnnect(this.url)
        },10000)

    }
    



    static create(url,cb){
    
        return new Ws(url,cb)
    }
}

export default Ws;