// import Username from "@/app/[username]/page";
import mongoose from "mongoose";
import { Schema } from "mongoose";
// import Email from "next-auth/providers/email";
 const userSchema= new Schema({
    email:{
        type: String,
        required:true
    },
      name:{
        type: String
       
    },
      username:{
        type: String,
         required:true
     
    },
      coverpic:{
        type: String
       
    },
      profilepic:{
        type: String
     
    },
    stripeid: {
    type: String
  },
  stripesecret: {
    type: String
  },
    // createdAt:{type: Date, Default:Date.Now},
    // updateeAt:{type: Date, Default:Date.Now}
    createdAt: {
  type: Date,
  default: Date.now
},
updatedAt: {
  type: Date,
  default: Date.now
}

 });

export default mongoose.models.User || mongoose.model("User", userSchema);