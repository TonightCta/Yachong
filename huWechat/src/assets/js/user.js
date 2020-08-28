import Axios from 'axios';
import store from "./store.js";
import {Toast} from 'vant'
import { GetUrlKey } from './getShare.js';
import {shareWX} from '@/assets/js/share.js'
let errText='服务器错误，请检查网络或稍后再试'
export function getUser(){
  // let Uapi='/api';//正式服
  let Uapi='/dev';//测试服
   let baseToken='94da543706f2bdc36679f837b0837b76';
   let baseID='a801c18890d1c6287565a0910d25f137'
  // let baseToken=window.localStorage.getItem('token');
  // let baseID=window.localStorage.getItem('sessionID');
  Axios.get(Uapi+'/user/read',{//域名登录
    headers:{
      'Authorization':baseToken,
      'sessionId':baseID,
      'v':'v2'
    }
  }).then((res)=>{
    if(res.data.state==1){
      store.commit('userMes_fn',res.data.data);
      window.localStorage.setItem('user',true);
      window.localStorage.setItem('shareCode',res.data.data.share_code);
    }else{
      Toast(res.data.msg)
    }
  }).catch((err)=>{
    // Toast('登录已过期,将为您进行自动授权')
    //test/We/index.html
    window.localStorage.clear('token')
    window.localStorage.clear('sessionID');
    // setTimeout(()=>{
      if(GetUrlKey('share_code',window.location.href)){
        // alert();
        Axios.post(Uapi+'/user/index/wxconfig').then((res)=>{
          let wxConfig=JSON.parse(res.data.data);
          //test/We/index.html
          let auth_url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wxConfig.appId+"&redirect_uri=http://m.dahujing.com/test/We/index.html?share_code="+GetUrlKey('share_code',window.location.href)+"&response_type=code&scope=snsapi_userinfo&state=STATE#"+GetUrlKey('path',window.location.href)+"&a=wechat_redirect";
          window.location.replace(auth_url);
        }).catch((err)=>{
          // Toast('微信配置错误')
        })
      }else{
        Axios.post(Uapi+'/user/index/wxconfig').then((res)=>{
          let wxConfig=JSON.parse(res.data.data);
          let auth_url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wxConfig.appId+"&redirect_uri=http://m.dahujing.com/test/We/index.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
          window.location.replace(auth_url);
        }).catch((err)=>{
          // Toast('微信配置错误')
        })
      }
    // },700)
  })
}
