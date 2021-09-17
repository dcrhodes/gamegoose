import { Router } from 'express'
import * as profilesCtrl from "../controllers/profiles.js"

export {
  router
}

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/getname', isLoggedIn, profilesCtrl.getName)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.put('/:id', isLoggedIn, profilesCtrl.update)
router.get('/:id/edit', isLoggedIn, profilesCtrl.edit)
router.get('/:id/friend', isLoggedIn, profilesCtrl.addFriend)
router.get('/:id/unfriend', isLoggedIn, profilesCtrl.removeFriend)
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}