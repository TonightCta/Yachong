import Axios from 'axios'
import {Toast} from 'vant'
let Uapi='/dev'//测试服
// let Uapi='/api'//正式服
export function shareWX(wxParam){
  Axios.post(Uapi+'/user/index/wxconfig',{
    'url':window.location.href
  }).then((res)=>{
    if(res.data.state==1){
      let wxConfig=JSON.parse(res.data.data);
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: wxConfig.appId, // 必填，公众号的唯一标识
        timestamp: wxConfig.timestamp * 1, // 必填，生成签名的时间戳
        nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
        signature: wxConfig.signature,// 必填，签名
        jsApiList: wxConfig.jsApiList // 必填，需要使用的JS接口列表
      });
      wx.ready(function(){
        //分享到朋友圈
        wx.updateTimelineShareData({
          title: wxParam.title,
          link: wxParam.link,
          imgUrl:'http://dahujing.oss-cn-hangzhou.aliyuncs.com/logo.png',
          success: (()=>{
            // Toast('分享成功')
          }),
          cancel: (()=>{
            // Toast('分享失败')
          })
        });
        //分享给朋友
        wx.updateAppMessageShareData({
           title: wxParam.title,
           desc: wxParam.desc,
           link: wxParam.link,
           type: wxParam.type,
           imgUrl:'http://dahujing.oss-cn-hangzhou.aliyuncs.com/logo.png',
           success: (()=>{
             // Toast('分享成功')
           }),
           cancel: (()=>{
             // Toast('分享失败')
           })
          });
      });
    }
  });
}
// alert(1)
