import { Game } from '../models/game.js'
import { GameReview } from '../models/gameReview.js'
import axios from 'axios'

export {
  search,
  show,
  addToCollection,
  removeFromCollection
}

function addToCollection(req, res) {
  // Add id of the logged in user to req.body for creating a game for the first time (if it doesn't exist in the database)
  req.body.collectedBy = req.user.profile._id
  // Look to see if the game already exists in the database
  Game.findOne({ rawgId: req.params.id })
  .then(game => {
    // If it does, push the user's profile id to game.collectedBy
    if (game) {
      game.collectedBy.push(req.user.profile._id)
      game.save()
      .then(() => {
        res.redirect(`/games/${req.params.id}`)
      })
    } else {
      // If it doesn't exist in the database, create it!
      Game.create(req.body)
      .then(() => {
        res.redirect(`/games/${req.params.id}`)
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function removeFromCollection(req, res) {
  // Find the game in the database
  Game.findOne({ rawgId: req.params.id })
  .then(game => {
    // Remove the user's profile id from collectedBy
    game.collectedBy.remove({_id: req.user.profile._id})
    game.save()
    .then(() => {
      res.redirect(`/games/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  axios
  .get(`https://api.rawg.io/api/games/${req.params.id}?key=${process.env.API_KEY}`)
  .then((response) => {
    Game.findOne({ rawgId: response.data.id })
    // This is where we'll populate collectedBy
    .populate('collectedBy')
    // This is where we'll deep-populate reviews
    .populate({
      path: 'reviews',
      populate: {
        path: 'author'
      }
    })
    .then((game)=> {
      res.render("games/show", {
        title: "Game Details",
        apiResult: response.data,
        game
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function search(req, res) {
  axios.get(`https://api.rawg.io/api/games?page_size=10&search=${req.body.search}&key=${process.env.API_KEY}`)
  .then(response => {
    res.render('games/new', {
      title: 'Search Results',
      results: response.data.results
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}