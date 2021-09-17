import mongoose from 'mongoose'
const Schema = mongoose.Schema

export {
  GameReview
}

const gameReviewSchema = new Schema({
  rating: {type: Number, min: 1, max: 5},
  content: String,
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  author: { type: Schema.Types.ObjectId, ref: "Profile" },
},{
  timestamps: true,
})

const GameReview = mongoose.model("GameReview", gameReviewSchema)