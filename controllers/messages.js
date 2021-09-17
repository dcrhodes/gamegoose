import { Message } from '../models/message.js'

export { 
  index,
  create,
  show,
  reply
}

function reply(req, res) {
  // Add author of reply to req.body
  req.body.author = req.user.profile._id
  Message.findById(req.params.id)
  .then(message => {
    message.replies.push(req.body)
    message.save()
    .then(() => {
      res.redirect(`/messages/${req.params.id}`)
    })
  })
}

function show(req, res) {
  Message.findById(req.params.id)
  .populate('author')
  .populate({
    path: 'replies',
    populate: {
      path: 'author'
    }
  })
  .then(message => {
    res.render('messages/show', {
      title: 'Message Details',
      message
    })
  })
}

function create(req, res) {
  // Add currently logged in user's profile id to req.body
  req.body.author = req.user.profile._id
  Message.create(req.body)
  .then(()=> {
    res.redirect('/messages')
  })
}

function index(req, res) {
  Message.find({})
  .populate('author')
  .sort({ createdAt: "desc" })
  .then(messages => {
    res.render('messages/index', {
      title: "Message Board",
      messages
    })
  })
}