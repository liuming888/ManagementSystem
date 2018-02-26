import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/doc',
            name: '报名登记表',
            component() {
                return System.import("../views/doc/index.vue");
            }
        },
        {
            path: "/CGDoc",
            name: "报名登记查询修改",
            component() {
                return System.import("../views/CGDoc/index.vue");
            }
        },
        {
            path: "/FZDoc/zhiyuan",
            name: "公司职员统计",
            component() {
                return System.import("../views/FZDoc/zhiyuan.vue");
            }
        },
        {
            path: "/FZDoc/zaizhi",
            name: "在职人员名册",
            component() {
                return System.import("../views/FZDoc/zaizhi.vue");
            }
        },
        {
            path: "/doc_QK/gegangwei",
            name: "各岗位报名情况",
            component() {
                return System.import("../views/doc_QK/gegangwei.vue");
            }
        },
        {
            path: "/doc_QK/chaMX",
            name: "查询报名信息明细",
            component() {
                return System.import("../views/doc_QK/chaMX.vue");
            }
        },
        {
            path: "/postYLB",
            name: "报名单位岗位一览表",
            component() {
                return System.import("../views/postYLB/index.vue");
            }
        },
        {
            path: "/login",
            name: "登录",
            component() {
                return System.import("../views/login/index.vue");
            }
        },
        {
            path: "/signin",
            name: "注册",
            component() {
                return System.import("../views/signin/index.vue");
            }
        },
        {
            path: '/user',
            name: '用户信息',
            component() {
                return System.import("../views/user/index.vue");
            }
        },
        {
            path: "*",
            redirect: "/doc"
        }
    ]
})
