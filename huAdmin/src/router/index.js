import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Login',
      component:resolve=>require(['@/views/login/index'],resolve)
    },
    {
      path: '/admin',
      name: 'Admin',
      component: resolve=>require(['@/views/index/index'],resolve),
      children:[
        {
          path:'/home',
          name:'Home',
          component:resolve=>require(['@/views/home'],resolve)
        },
        {
          path:'/strategyList',
          name:'strategyList',//策略管理
          component:resolve=>require(['@/views/strategy/strategyList'],resolve)
        },
        {
          path:'/agentList',
          name:'AgentList',//代理列表,
          component:resolve=>require(['@/views/user/agentList'],resolve)
        },
        {
          path:'/allUser',
          name:'AllUser',//全部用户,
          component:resolve=>require(['@/views/user/allUser'],resolve)
        },
        {
          path:'/userCus',
          name:'UserCus',//全部客户
          component:resolve=>require(['@/views/user/userCus'],resolve)
        },
        {
          path:'/worchDetails',
          name:'WorchDetails',//净值列表
          component:resolve=>require(['@/views/worch/worchDetails'],resolve)
        },
        {
          path:'/worchUpLog',
          name:'WorchUpLog',//净值上传记录
          component:resolve=>require(['@/views/worch/upLog'],resolve)
        },
        {
          path:'/order',
          name:'Order',//订单管理
          component:resolve=>require(['@/views/order/orderTion'],resolve)
        },
        {
          path:'/endOrder',//结算订单
          name:'EndOrder',
          component:resolve=>require(['@/views/order/endOrder'],resolve)
        },
        {
          path:'/backOrder',//退款列表
          name:'BackOrder',
          component:resolve=>require(['@/views/order/backOrder'],resolve)
        },
        {
          path:'/tiOrder',//提现列表
          name:'TiOrder',
          component:resolve=>require(['@/views/order/tiOrder'],resolve)
        },
        {
          path:'/mange',
          name:'Mange',//账号管理
          component:resolve=>require(['@/views/mange/mangeList'],resolve)
        },
        {
          path:'/borker',
          name:'BorKer',//券商管理
          component:resolve=>require(['@/views/broker/brokerList'],resolve)
        },
        {
          path:'/group',//分组列表
          name:'Group',
          component:resolve=>require(['@/views/jurList/group'],resolve)
        },
        {
          path:'/rule',//规则管理
          name:'Rule',
          component:resolve=>require(['@/views/jurList/rule'],resolve)
        }
      ],
      redirect:'/home'
    },
  ]
})
