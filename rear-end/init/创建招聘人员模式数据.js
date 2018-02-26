var fs=require("fs");
var mockjs=require("mockjs");
var path = require("path");
var Random=mockjs.Random;
var monishujudizhi = path.resolve(__dirname, "招聘人员模拟数据.txt");
fs.writeFileSync(monishujudizhi, "");
console.log("招聘人员模拟数据.txt文件已经清空，下面我为你生成新的");
for(var i=0;i<300;i++){
    var o={};
    var str="1234567890hsdjfag",id='';
    for(var d=0;d<8;d++){
        id+=str[~~(Math.random()*str.length)];
    }
    o.id=id;
    o.danwei = Random.pick(['成型车间', '针车车间', '裁断车间', '财务部', '人事部', '业务部', '采购部', '品质部',"行政部"]);
    o.gangwei = Random.pick(["员工", "员工", "员工", "员工", "员工", "员工", "员工", "员工", "员工", "副组长", "副组长", "副组长", "员工", "组长", "组长","副经理"]);
    o.name = Random.cname();
    o.shenfenzheng = Random.id();
    o.mingzhu = Random.pick(["汉族", "汉族", "汉族", "汉族", "汉族", "汉族", "蒙古族", "回族", "苗族", "壮族","黎族"]);
    o.hunyin = Random.pick(["已婚", "已婚", "未婚", "未婚", "离异", "已婚", "未婚"]);
    o.huji = Random.county(true);
    o.zhengzhimianmao = Random.pick(["良好","优秀"]);
    o.xueli = Random.pick(["初中及以下", "高中", "大专", "本科", "研究生", "博士"]);
    o.shengyu = Random.pick(["未育", "怀孕", "已育一孩", "已育二孩", "其它", "未育"]);
    o.shoujihao = Random.integer(10000000000, 99999999999).toString();
    o.dizhi = Random.pick(["租房","家","单位宿舍"]);
    o.liaoxiren = Random.cname();
    o.liaoxirenhaoma = Random.integer(10000000000, 99999999999).toString();
    o.jiantichengyuan=[];
    o.shifouyouqinyou = Random.pick(["有","无","无"]);
    o.qipanyueshouru = Random.integer(8000, 19999).toString();
    o.zuichidaogangshijian=~~(Math.random()*60)+"天";
    o.chengxinchengnuo ="提交后，本人郑重承诺以上内容属实并同意招聘单位对以上情况进行调查，如有任何虚假，本人愿无条件接受解聘处理！";
    fs.appendFileSync(monishujudizhi, JSON.stringify(o) + "\n\r");
}
console.log("招聘人员模拟数据创建成功");
