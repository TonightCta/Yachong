import Axios from 'axios'
import {Toast} from 'vant'
import store from './store.js'
let errText='服务器错误，请检查网络或稍后再试'
let Uapi='/dev'//测试服
// let Uapi='/api'//正式服
// let baseToken='b1b289f36163d3d77ae1eb45923b1f62';
// let baseID='55a5ac1a825a92d9b89684db901564b4'
let baseToken=window.localStorage.getItem('token');
let baseID=window.localStorage.getItem('sessionID');
export function getMyStar(){
  Axios.get(Uapi+'/user/strategy/mine',{
    headers:{
      'Authorization':baseToken,
      'SessionId':baseID,
      'v':'v2'
    }
  }).then((res)=>{
    if(res.data.state==1){
      store.commit('myStar_fn',res.data.data.list)
    }else{
      Toast(res.data.msg)
    }
  }).catch((err)=>{
    // Toast(errText);
  })
}

//废弃
