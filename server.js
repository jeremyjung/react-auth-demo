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

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => res.jsonp(req.query))

server.get('/user_token', (req, res) => {
  const user = auth(req)
  const db = router.db
  const users = db.get('users').value()
  const foundUser = users.find((u) => u.username === user.name && u.password === user.pass)
  if (foundUser) {
    const token = jwtBase.sign({
      id: foundUser.id
    }, secret)
    res.json({
      username: foundUser.username,
      role: foundUser.role,
      token: token
    })
  } else res.status(401).json({error: 'Incorrect credentials'})
})

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
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

// Use default router
server.use(router)
server.listen(3001, () => console.log('JSON Server is running'))
