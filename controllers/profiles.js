import { Profile } from "../models/profile.js"
import { Game } from "../models/game.js"

export {
  index,
  show,
  edit,
  update,
  addFriend,
  removeFriend,
  getName
}

function getName(req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    res.json(profile.name)
  })
}

function addFriend(req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.push(req.params.id)
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function removeFriend(req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.remove({_id: req.params.id})
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  Profile.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(profile => {
    res.redirect(`/profiles/${profile._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.render('profiles/edit', {
      title: `Editing ${profile.name}'s profile`,
      profile
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  // Find the profile that was clicked
  Profile.findById(req.params.id)
  // Populate friends to get profile data for each of them
  .populate('friends')
  .then(profile => {
    // Use the profile clicked to find games belonging to that user
    Game.find({ collectedBy: profile._id })
    .then(games => {
      // Find the profile of the current logged in user
      Profile.findById(req.user.profile)
      .then(userProfile => {
        res.render('profiles/show', {
          // Profile of the user clicked
          profile,
          // Profile of the logged in user
          userProfile,
          title: `${profile.name}'s profile`,
          games
        })
      })
    })

  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      title: "Game Goose Profiles",
      profiles,
    })
  })
}