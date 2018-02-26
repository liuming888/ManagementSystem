import * as type from "../type/type.js";
export default {
    [type.USERSURL](state, payload) {//初始化该用户数据
        state.userMap.userObj = payload;
    },
    [type.CHANGEIMG](state, payload) {//改头像图片
        state.userMap.userurl = "../../../static/image/" + payload;
        state.userMap.appuserurl = "../static/image/" + payload;
        state.userMap = { ...state.userMap };
    },
    [type.NICHENG](state, payload) {//改用户昵称
        var obj = state.userMap;
        obj.nicheng = payload.nicheng;
        state.userMap = { ...obj };
        localStorage.setItem('nicheng', obj.nicheng);
    },
    [type.GAIUSERS](state, payload) {//改用户别的资料
        state.userMap.userObj[Object.keys(payload)[0]] = Object.values(payload)[0];
        state.userMap = { ...state.userMap };
        localStorage.setItem("userObj", JSON.stringify(state.userMap.userObj));//存进本地
    },
    [type.LOGIN](state, payload) {//登录账号的信息
        state.userMap.userObj = payload;
        localStorage.setItem("userObj", JSON.stringify(payload));//存进本地
    },
    [type.XLOGIN](state, payload) {//账号密码错误
        if (payload) {//登录框获取焦点时
            state.isshow = false;
            return;
        }
        state.isshow = true;
    },
    [type.SIGNIN](state, payload) {//注册
        state.zhucedata = payload.data;
        if (payload.result) {
            state.userMap.userObj = payload.result;
        }
    },
    [type.ALLPAGE](state, payload) {//数据库数据初始
        state.maplist = payload.data;
        state.pages = payload.pages;
    },
    [type.TIJIAO](state, payload) {//添加数据
        state.maplist.push(payload);
    },
    [type.CHABM](state, payload) {//查询报名登记表的查询条件
        state.pages = payload.pages;
        state.maplist = payload.data;
    },
    [type.DEL](state, payload) {//删除
        state.maplist = payload.data;//全部
        state.pages = payload.pages;
        var arr = [];
        for (var i = 0; i < payload.arr.length; i++) {
            arr = state.mingxilist.filter((item, idx) => {//明细
                if (item.id == payload.arr[i].id) {
                    return false
                };
                return true;
            })
        }
        state.lists = state.maplist.length;//某职位报名明细总数
    },
    [type.DELZAIZHI](state, payload) {//删除
        var arr = [];
        for (var i = 0; i < payload.arr.length; i++) {
            arr = state.zaizhilist.filter((item, idx) => {//明细
                if (item.id == payload.arr[i].id) {
                    return false
                };
                return true;
            })
        }
        state.listszz = payload.data.length;//某职位人员总数
        /*   if (payload.arr.length < 1) return;//如果是多选录取的话
          state.zaizhilist=arr;  
          state.listszz =  payload.data.length;//某职位人员总数 */
    },
    [type.XIUGAI](state, payload) {//修改
        state.maplist = state.maplist.map(item => {//全部
            if (item.id == payload.id) {
                item = payload;
            }
            return item;
        })
        state.mingxilist = state.mingxilist.map(item => {//明细
            if (item.id == payload.id) {
                item = payload;
            }
            return item;
        })
    },
    [type.ZAIZHIXIUGAI](state, payload) {//在职修改
        state.zaizhilist = state.zaizhilist.map(item => {
            if (item.id == payload.id) {
                item = payload;
            }
            return item;
        })
    },
    [type.ZHUTUSHUZHU](state, payload) {//岗位一览图数据
        state.gangweilist = payload;
    },
    [type.ALLSUM](state, payload) {//拉取各部门招聘人数
        state.danweirenshuArr = payload;
    },
    [type.ZAIZHISUM](state, payload) {//拉取公司在职总人数
        state.zaizhirenshuArr = payload;
    },
    [type.ZAIZHIALL](state, payload) {//拉取在职人员数据
        state.zaizhilist = payload.data;
        state.listszz = payload.lists
    },
    [type.MINGXIALL](state, payload) {//拉取职位人员明细数据
        state.mingxilist = payload.data;
        state.lists = payload.lists;
    },
    [type.LUQU](state, payload) {//录取
        state.zaizhilist = this.state.zaizhilist.concat(payload);
    }

}