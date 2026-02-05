import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const offerskillschema = new Schema({
    skillname:{
      type: String,
      required: true,
      index: true,
      lowercase: true,
    },
    level:{
       type: String,
       required: true,
       enum: ["Beginner", "Intermidiate", "Advance"]
    },
    owner: {
       type: Schema.Types.ObjectId,
       ref: "User"
    }
},{timestamps: true})

//? Here I am pluging AggregationPipeline
offerskillschema.plugin(mongooseAggregatePaginate)

export const Offerskill = mongoose.model("Offerskill", offerskillschema)