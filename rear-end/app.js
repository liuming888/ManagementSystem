var express = require("express");
var app = express();
var fs = require("fs");
var url = require("url");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/zpglxt");//链接mongod数据库的zpglxt库名 
var formidable = require("formidable");
var Bmry = require("./model/Bmry.js");//报名
var Zzry = require("./model/Zzry.js");//在职
var User = require("./model/User.js");//用户信息
var cookieParser = require('cookie-parser');//cookie模块
app.use(cookieParser());
var path = require('path');
var gm = require("gm");

app.get("/all/:page", (req, res) => {//报名登记查询表提交过来的
    var page = req.params.page;
    Bmry.find({}, (err, result) => {
        var start = page * 8 - 8;//因为每页就两条 自己算的公式
        var end = page * 8 + 16;//换页预加载3页
        if (end >= result.length - 1) end = result.length - 1;//不然超过数组下标了
        res.json({ data: result.slice(start, end), pages: ~~(result.length / 8) });//换页预加载3页 并传入总页数，默认每页两条
    })
})
app.post("/all", (req, res) => {//接受报名登记表提交过来的
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fileds, files) => {
        Bmry.create(fileds, function (err) {//添加到数据库
            if (!err) console.log("添加成功");
        })
    })
})
app.get("/chabm/:page", (req, res) => {//查询报名登记表的查询条件
    var page = req.params.page;
    let obj = url.parse(req.url, true).query;
    let shenfenzheng = obj.shenfenzheng;
    let xingming = obj.names;
    let shoujihao = obj.shoujihao;
    if (shenfenzheng != '' && xingming != '' && shoujihao != '') {
        Bmry.find({ "shenfenzheng": shenfenzheng, "name": xingming, "shoujihao": shoujihao }).exec((err, docs) => {
            if (docs.length == 0) {
                res.redirect("/api/all/1");//如果没符合条件就显示全部
                return;
            }
            res.json({ data, pages: ~~(docs.length / 8) });
        })
    } else {
        Bmry.find({ "$or": [{ "shenfenzheng": shenfenzheng }, { "name": xingming }, { "shoujihao": shoujihao }] }, (err, result) => {
            var start = page * 8 - 8;//因为每页就两条 自己算的公式
            var end = page * 8 + 16;//换页预加载3页
            if (end >= result.length - 1) end = result.length - 1;//不然超过数组下标了
            var data = (result.length == 1 ? result : result.slice(start, end)).reverse();
            if (result.length == 0) {
                res.redirect("/api/all/1");//如果没符合条件就显示全部
                return;
            } else {
                res.json({ data, pages: ~~(result.length / 8) });//换页预加载3页 并传入总页数，默认每页两条
            }
        })
    }
})
app.delete("/delete", (req, res) => {//删除
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fileds, files) => {
        for (var i = 0; i < fileds.data.length; i++) {
            var id = fileds.data[i].id;
            Bmry.remove({ id }, (err) => {
                if (!err) console.log("删除成功");
            })
        }
        Bmry.find({}, (err, result) => {
            res.json({ data: result, pages: ~~(result.length / 8) });//换页预加载3页 并传入总页数，默认每页两条
        })
    })
})
app.delete("/lizhidelete", (req, res) => {//离职
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fileds, files) => {
        for (var i = 0; i < fileds.data.length; i++) {
            var id = fileds.data[i].id;
            Zzry.remove({ id }, (err) => {
                if (!err) console.log("离职删除成功");
            })
        }
        Zzry.find({}, (err, result) => {
            res.json({ data: result });
        })
    })
})
app.checkout("/checkout", (req, res) => {//修改
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fileds) => {
        Bmry.update({ id: fileds.id }, { "$set": fileds }, function (err) {
            if (!err) console.log("修改成功");
        })
    })
})
app.checkout("/zzxgcheckout", (req, res) => {//在职修改
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fileds) => {
        Zzry.update({ id: fileds.id }, { "$set": fileds }, function (err) {
            if (!err) console.log("在职修改成功");
        })
    })
})
app.get("/gangweitu/:danwei", (req, res) => {//单位岗位一览表
    var danwei = req.params.danwei;
    Bmry.find({ danwei }, (err, result) => {
        var arr = [];
        if (!err) {
            result.forEach(item => {
                arr.push(item.gangwei);
            })
            var gangwei = Array.from(new Set(arr));//岗位数组
            var gangweiArr = [];//岗位要返回前端的结果数组
            gangwei.forEach(gw => {
                var sum = 0
                arr.forEach(item => {
                    if (gw == item) {
                        sum++;
                    }
                })
                gangweiArr.push({ "name": gw, "value": sum });
            })
            res.json({ "result": gangweiArr });
        }
    })
})
app.get("/renshu", (req, res) => {//单位岗位一览表
    Bmry.find({}, (err, result) => {
        var arr = [];
        if (!err) {
            result.forEach(item => {
                if (!(item.danwei)) item.danwei = "其它";
                arr.push(item.danwei);
            })
            var danwei = Array.from(new Set(arr));//岗位数组
            var danweiArr = [];//岗位要返回前端的结果数组
            danwei.forEach(gw => {
                var sum = 0
                arr.forEach(item => {
                    if (gw == item) {
                        sum++;
                    }
                })
                danweiArr.push({ "name": gw, "value": sum });
            })
            res.json({ "result": danweiArr });
        }
    })
});
app.get("/zaizhishu", (req, res) => {//公司在职一览表
    Zzry.find({}, (err, result) => {
        var arr = [];
        if (!err) {
            result.forEach(item => {
                if (!(item.danwei)) item.danwei = "其它";
                arr.push(item.danwei);
            })
            var danwei = Array.from(new Set(arr));//岗位数组
            var danweiArr = [];//岗位要返回前端的结果数组
            danwei.forEach(gw => {
                var sum = 0
                arr.forEach(item => {
                    if (gw == item) {
                        sum++;
                    }
                })
                danweiArr.push({ "name": gw, "value": sum });
            })
            res.json({ "result": danweiArr });
        }
    })
})
app.post("/mingxiall", (req, res) => {//某单位某职位报名人员
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fileds) => {
        var lists;
        Bmry.find({ danwei: fileds.danwei, gangwei: fileds.gangwei }).exec(function (err, result) {
            lists = result.length;
            //根据单位职位查找，然后跳过多少条，拿多少条 注意写在第一次查询里面，因为nodejs没有window对象，全局变量不好说
            Bmry.find({ danwei: fileds.danwei, gangwei: fileds.gangwei }).skip((fileds.page - 1) * fileds.pagesum).limit(fileds.pagesum).exec(function (err, docs) {
                res.json({ data: docs, lists });
            });
        })
    })
})
app.post("/zaizhiall", (req, res) => {//某单位某职位在职人员
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fileds) => {
        var lists;
        Zzry.find({ danwei: fileds.danwei, gangwei: fileds.gangwei }).exec(function (err, result) {
            lists = result.length;
            //根据单位职位查找，然后跳过多少条，拿多少条 注意写在第一次查询里面，因为nodejs没有window对象，全局变量不好说
            Zzry.find({ danwei: fileds.danwei, gangwei: fileds.gangwei }).skip((fileds.page - 1) * fileds.pagesum).limit(fileds.pagesum).exec(function (err, docs) {
                res.json({ data: docs, lists });
            });
        })
    })
})
app.post("/luqu", (req, res) => {//录取
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fileds) => {
        for (var i = 0; i < fileds.data.length; i++) {
            Zzry.create(fileds.data[i], function (err) {
                if (!err) console.log(`录取成功，写入数据库成功`);
            })
        }
    })
})

app.post("/login", (req, res) => {//登录
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fileds) => {
        User.find({ zhanghao: fileds.zhanghao }, (err, result) => {
            if (result.length > 0) {
                User.find(fileds).exec((err, docs) => {
                    if (docs.length > 0) {//账号密码都正确
                        res.json({ data: 1, users: docs[0] });
                    } else {//账号密码错误
                        res.json({ data: -1 });
                    }
                })
            } else {//没这账号提示注册
                res.json({ data: 0 });
            }
        })
    })
})
app.post("/signin", (req, res) => {//注册
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fileds) => {
        User.find({ zhanghao: fileds.zhanghao }, (err, result) => {
            if (result.length > 0) {//账号名已存在
                res.json({ data: 0 });
            } else {
                User.create(fileds, (err) => {
                    if (!err) {//注册成功
                        res.json({ data: 1, result: fileds });
                    } else {//注册失败
                        res.json({ data: -1 })
                    }
                })
            }
        })
    })
})
app.post('/gaiusers', (req, res) => {//修改用户信息
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fileds) => {
        let k = Object.keys(fileds)[0];
        let v = Object.values(fileds)[0];
        let id = Object.values(fileds)[1];

        User.update({ id }, { '$set': { [k]: v } }, (err) => {
            if (!err) {
                console.log('用户信息修改成功')
            }
        })
    })
})
var router = express.Router();
app.post('/changeimg', (req, res) => {//选择头像的图片
    var form = new formidable.IncomingForm();
    form.uploadDir = path.resolve(__dirname, "../frontEnd/static/image");
    form.keepExtensions = true;
    form.parse(req, (err, fileds, files) => {
        var oldpath = files.file.path;//初始路径格式的路径
        var idx = oldpath.lastIndexOf('\\');
        var imgpath = oldpath.substr(idx + 1);//返回个\upload_7ef1ef31937a483fc56595ee7a9a0275.jpg这样的路径
        res.json({ data: imgpath });
    })
})
app.post("/caiqie", (req, res) => {//裁切按钮点击后
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fileds) => {
        //得到前端发来的各种数据
        var { x, y, w, h, imageUrl, minimgw, minimgh, id } = fileds;
        //裁切图片
        imageUrl = imageUrl;
        var urlimg = '../frontEnd/static/image/' + imageUrl;
        var fullurl = path.resolve(__dirname, urlimg);
        //查看上传的文件的宽度、高度
        gm(fullurl).size(function (err, size) {
            var roatw = minimgw / size.width;
            var roath = minimgh / size.height;
            gm(fullurl)
                .crop(w / roatw, h / roath, x / roatw, y / roath)      //注意这里的坑：参数的顺序是宽、高、x、y。
                .resize(w / roatw, h / roath, "!")
                .write(fullurl, function (err) {     //覆盖原图即可
                    res.json({ 'data': imageUrl });
                    //写入数据库imgpath
                    User.update({ id }, { '$set': { imgpath: imageUrl } }, (err) => {
                        if (!err) {
                            console.log('用户信息修改成功')
                        }
                    })
                });
        });
    })
})
app.post('/usersurl',(req,res)=>{//修改用户头像的图片地址
    var form = new formidable.IncomingForm();
    form.parse(req,(err,fileds)=>{
        var id = JSON.parse(Object.keys(fileds)[0]).id;
        User.find({id},(err,result)=>{
            res.json({ data: result[0]});
        })
    })
})
app.listen(3000);
