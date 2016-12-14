const jsonServer = require('json-server')
const auth = require('basic-auth')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const secret = 'secret'
const jwt = require('express-jwt')
const jwtBase = require('jsonwebtoken')

// Set default middlewares
server.use(middlewares)

server.get('/user_token', (req, res) => {
  const user = auth(req)
  const db = router.db
  const users = db.get('users').value()
  const foundUser = users.find((u) => u.username === user.name && u.password === user.pass)
  if (foundUser) {
    const token = jwtBase.sign({
      id: foundUser.id,
      username: foundUser.username,
      role: foundUser.role
    }, secret)
    res.json({
      username: foundUser.username,
      role: foundUser.role,
      token: token
    })
  } else res.status(401).json({error: 'Incorrect credentials'})
})

// Make certain routes available to anonymous users
server.use(jwt({ secret: secret }).unless({
  path: [
    '/user_token',
    { url: '/games', methods: ['GET'] },
    { url: '/playlists', methods: ['GET'] },
    { url: '/users', methods: ['GET'] }
  ]
}))

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Restrict access to routes based on role
server.use((req, res, next) => {
  let userHasPermission = true
  if (req.method === 'POST') {
    // Only admin can add games
    if (req.path === '/games' && req.user.role !== 'admin') {
      userHasPermission = false
    }
  }
  if (userHasPermission) next()
  else res.status(403).json({error: 'No permission'})
})

// Use default router
server.use(router)
server.listen(3001, () => console.log('JSON Server is running'))
