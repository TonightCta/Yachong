import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userMes: {},
        wxCode: null, //微信授权code
        token: null, //接口验证
        sessionID: null, //接口验证
        myStar: [], //我的策略
        fulMes: {}, //涨停信息
        monEchMes: {}, //月份行情回顾
        weekEchMes: {}, //星期行情回顾
        yearEchMes: {}, //年度行情回顾
        perText: {}, //筛选条件
        mineStart:[],//个人中心推荐策略
        homeStart:[],//首页推荐策略
    },
    mutations: {
        userMes_fn(state, opt) {
            state.userMes = opt
        },
        wxCode_fn(state, opt) {
            state.wxCode = opt
        },
        token_fn(state, opt) {
            state.token = opt
        },
        sessionID_fn(state, opt) {
            state.sessionID = opt;
        },
        myStar_fn(state, opt) {
            state.myStar=opt;
        },
        fulMes_fn(state, opt) {
            state.fulMes = opt;
        },
        monEchMes_fn(state, opt) {
            state.monEchMes = opt;
        },
        weekEchMes_fn(state, opt) {
            state.weekEchMes = opt;
        },
        yearEchMes_fn(state, opt) {
            state.yearEchMes = opt;
        },
        perText_fn(state, opt) {
            state.perText = opt;
        },
        mineStart_fn(state,opt){
          state.mineStart=opt;
        },
        homeStart_fn(state,opt){
          state.homeStart=opt;
        },
    },
    getter: {},
    actions: {}
});
export default store;
