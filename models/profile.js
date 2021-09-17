import mongoose from 'mongoose'
const Schema = mongoose.Schema
export {
  Profile
}

const profileSchema = new Schema({
  name: String,
  avatar: String,
  friends: [{type: Schema.Types.ObjectId, ref: "Profile"}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)