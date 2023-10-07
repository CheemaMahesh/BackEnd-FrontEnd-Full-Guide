const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name:{
type:String,
required:true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  },
  feedbacks:[{
    type:mongoose.Schema.Types.ObjectId,
        ref:'User'
  }],
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
        ref:'Feedback'
  }]
  
}, { timestamps: true });



const User = mongoose.model('User', userSchema);

module.exports = User;
