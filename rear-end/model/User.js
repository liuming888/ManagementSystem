var mongoose = require("mongoose");
var schema = new mongoose.Schema({
    zhanghao: String,
    mima: String,
    youxiang: String,
    shoujihao: String,
    id: String,
    imgpath: String
})
var User = mongoose.model("User", schema);
module.exports = User;