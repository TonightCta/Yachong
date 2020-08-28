import http from '../utils/http.js'
// let resquest='http://admin.dahujing.com/api'//正式服
let resquest='/dev'//测试服
// config>index.js>module.exports>dev//更换测试服地址
export default{
  getListAPI(url,params){
    return http.get(`${resquest}/${url}`,params)
  },
  postFormAPI(url,params){
    return http.post(`${resquest}/${url}`,params)
  },
  putSomeAPI(url,params){
    return http.put(`${resquest}/${url}`,params)
  },
  deleteListAPI(url,params){
    return http.delete(`${resquest}/${url}`,params)
  }
}
