

import mongoose from "mongoose";
import { Schema } from "mongoose";

const PaymentSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  to_user: {
    type: String,
    required: true
  },

  oid: {
    type: String,
    required: true
  },

  message: {
    type: String
  },

  amount: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },

  done: {
    type: Boolean,
    default: false
  }
});

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);































































































// import mongoose from "mongoose";
// import { Schema } from "mongoose";

// const PaymentSchema = new Schema({

//         name:{
//         type: String,
//         required:true
//     },
//         to_User:{
//         type: String,
//         required:true
//     },
//         oid:{
//         type: String,
//         required:true
//     },
//         massege:{
//         type: String,
     
//     },
//         amount:{
//         type: String,
//         required:true
//     },
//        createdAt:{type: Date, Default:Date.Now},
//     updateeAt:{type: Date, Default:Date.Now},
//       done:{
//         type: Boolean,
//         default:true
//     },


// })

// export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);