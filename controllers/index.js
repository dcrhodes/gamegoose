import { Profile } from "../models/profile.js"
import { Game } from '../models/game.js'
import { GameReview } from '../models/gameReview.js'
import { Message } from '../models/message.js'
import { Chat } from '../models/chat.js'

export {
  index,
  chatroom,
  addChat
}

function addChat(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    if (req.body.username === profile.name) {
      Chat.create(req.body)
      .then(() => {
        res.status(201).send("Added")
      })
    } else {
      res.status(208).send("Already added")
    }
  })
}

function chatroom(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    Chat.find({})
    .sort({ _id: -1 })
    .limit(150)
    .then((chats) => {
      res.render('chatroom', {
        title: "Chat Room",
        chats,
        profile
      })
    })
  })
}

function index(req, res) {
  Game.find({})
  .sort({_id: -1})
  .limit(6)
  .populate('collectedBy')
  .then(games => {
    Profile.find({})
    .sort({_id: -1})
    .limit(5)
    .then(profiles => {
      GameReview.find({})
      .sort({_id: -1})
      .limit(6)
      .populate('game')
      .populate('author')
      .then(reviews => {
        Message.find({})
        .sort({_id: -1})
        .limit(6)
        .populate('author')
        .then(messages => {
          res.render('index', {
            title: 'Latest Activity',
            games,
            profiles,
            reviews,
            messages
          })
        })
      })
    })
  })
}

