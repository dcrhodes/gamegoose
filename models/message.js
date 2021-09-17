import mongoose from 'mongoose'
const Schema = mongoose.Schema

export {
  Message
}

const replySchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  content: String
},{
  timestamps: true
})

const messageSchema = new Schema({
  title: String,
  content: String,
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  replies: [replySchema]
},{
  timestamps: true,
})

const Message = mongoose.model("Message", messageSchema)