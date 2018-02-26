import Vue from 'vue';
import router from '../../router/index.js';
import * as type from "../type/type.js";
export default {
    [type.ALLPAGE]({ commit }, payload) {//获取数据库全部数据
        Vue.axios.get("/api/all/" + payload.page).then(res => {
            var data = res.data
            commit("ALLPAGE", data);
        })
    },
    [type.TIJIAO]({ commit }, payload) {//添加数据
        Vue.axios.post("/api/all", payload, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        commit("TIJIAO", payload);
    },
    [type.CHABM]({ commit }, payload) {//查询报名登记表的查询条件
        Vue.axios.get("/api/chabm/" + payload.page, {
            params: payload
        }, {
                headers: {
                    "BBG-Key": "ab9ef204-3253-49d4-b229-3cc2383480a6"
                }
            }).then(res => {
                var data = res.data
                commit("CHABM", data);
            })
    },
    [type.DEL]({ commit }, payload) {//删除
        Vue.axios({
            method: 'delete',
            url: '/api/delete',
            data: {
                "data": payload
            }
        }).then(res => {
            var pages = res.data.pages;
            var data = res.data.data;
            commit("DEL", { pages, data, arr: payload });
        })
    },
    [type.DELZAIZHI]({ commit }, payload) {//删除
        Vue.axios({
            method: 'delete',
            url: '/api/lizhidelete',
            data: {
                "data": payload
            }
        }).then(res => {
            var pages = res.data.pages;
            var data = res.data.data;
            commit("DELZAIZHI", { pages, data, arr: payload });
        })
    },
    [type.XIUGAI]({ commit }, payload) {//修改
        Vue.axios({
            method: "checkout",
            url: '/api/checkout',
            data: payload
        })
        commit("XIUGAI", payload);
    },
    [type.ZAIZHIXIUGAI]({ commit }, payload) {//修改
        Vue.axios({
            method: "checkout",
            url: '/api/zzxgcheckout',
            data: payload
        })
        commit("ZAIZHIXIUGAI", payload);
    },
    [type.ZHUTUSHUZHU]({ commit }, payload) {//岗位一览图数据
        Vue.axios.get("/api/gangweitu/" + payload.danwei).then(res => {
            commit('ZHUTUSHUZHU', res.data.result);
        })
    },
    [type.ALLSUM]({ commit }, payload) {//拉取各部门招聘人数
        Vue.axios.get("/api/renshu").then(res => {
            commit('ALLSUM', res.data.result);
        })
    },
    [type.ZAIZHISUM]({ commit }, payload) {//拉取公司总人数
        Vue.axios.get("/api/zaizhishu").then(res => {
            commit('ZAIZHISUM', res.data.result);
        })
    },
    [type.ZAIZHIALL]({ commit }, payload) {//某部门某岗位在职人员名册
        Vue.axios({
            method: 'post',
            url: '/api/zaizhiall',
            data: payload
        }).then(res => {
            commit("ZAIZHIALL", res.data);
        })
    },
    [type.MINGXIALL]({ commit }, payload) {//某单位某职位报名人员名细（单位对应部门，职位对应岗位）
        Vue.axios({
            method: 'post',
            url: '/api/mingxiall',
            data: payload
        }).then(res => {
            commit("MINGXIALL", res.data);
        })
    },
    [type.LUQU]({ commit }, payload) {//录取
        Vue.axios({
            method: 'post',
            url: '/api/luqu',
            data: {
                data: payload
            }
        })
        commit("LUQU", payload);
    },
    [type.LOGIN]({ commit }, payload) {//登录
        Vue.axios({
            method: 'post',
            url: '/api/login',
            data: payload
        }).then((res) => {
            var result = res.data.data;
            if (result == 1) {//登录成功
                commit("LOGIN", res.data.users);
                localStorage.setItem('isLogin', true);//登录成功
                router.push({ path: "/doc" });
            } else if (result == -1) {//账号密码错误
                commit("XLOGIN");
            } else if (result == 0) {//提示注册
                localStorage.setItem('isLogin', true);
                router.push({ path: "/signin" });
            }
        })
    },
    [type.SIGNIN]({ commit }, payload) {//注册
        Vue.axios({
            'method': 'post',
            'url': '/api/signin',
            'data': payload
        }).then(res => {
            var data = res.data.data;
            if (data == 1) {//注册成功
                router.push({ path: "/login" });
                commit('SIGNIN', res.data)
            } else if (data == 0) {//账号名已存在
                commit('SIGNIN', { data });
            } else {//注册失败
                commit('SIGNIN', { data });
            }
        })
    },
    [type.GAIUSERS]({ commit }, payload) {//改用户信息
        Vue.axios({
            'method': 'post',
            'url': '/api/gaiusers',
            'data': payload
        })
        commit("GAIUSERS", payload);
    },
    [type.USERSURL]({ commit }, payload) {
        Vue.axios({//一打开页面拉取用户信息
            'method': 'post',
            'url': '/api/usersurl',
            'data': localStorage.getItem("userObj")
        }).then(res => {
            commit('CHANGEIMG', res.data.data.imgpath);//初始化用户头像
            commit('USERSURL', res.data.data);//初始化用户数据
        })
    }

}