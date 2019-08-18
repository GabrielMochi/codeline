const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
  req.session.destroy()
  res.json()
})

module.exports = router
