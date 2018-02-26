var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    id: String,
    danwei: String,
    gangwei: String,
    name: String,
    shenfenzheng: String,
    mingzhu: String,
    hunyin: String,
    huji: String,
    zhengzhimianmao: String,
    xueli: String,
    shengyu: String,
    shoujihao: String,
    dizhi:String,
    liaoxiren: String,
    liaoxirenhaoma: String,
    jiantichengyuan: [String],
    shifouyouqinyou: String,
    qipanyueshouru:String,
    zuichidaogangshijian:String,
    chengxinchengnuo:String
})
var Bmry = mongoose.model("Bmry",schema);
module.exports = Bmry;