const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : {
        type :String,
    },
    image : {
        type : String,
    }
})
  const  useModel = mongoose.model("User", userSchema);

  module.exports =useModel;