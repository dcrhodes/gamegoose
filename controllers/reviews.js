import { Game } from '../models/game.js'
import { GameReview } from '../models/gameReview.js'

export {
  create
}

function create(req, res) {
  // Add author/game info to req.body (for when we use model.create)
  req.body.author = req.user.profile._id
  req.body.game = req.params.id
  // Create the review
  GameReview.create(req.body)
  .then(review => {
    // Add the review reference to the Game
    Game.findById(req.params.id)
    .then(game => {
      game.reviews.push(review._id)
      game.save()
      .then(() => {
        res.redirect(`/games/${game.rawgId}`)
      })
    })
  })
}