
const express = require('express')

const app = express()

const port = 3000

const exphbs = require('express-handlebars')

const movieList = require('./download.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {

  res.render('index', { movie: movieList.results })
})

app.get('/show/:id', (req, res) => {
  const movie = movieList.results.filter(item => {
    return item.id === Number(req.params.id)
  })
  res.render('show', { movie: movie[0] })
})

app.get('/filter', (req, res) => {
  console.log(req.query.keyword)
  const keyword = req.query.keyword
  const filteredMovie = movieList.results.filter(item => {
    // console.log(item.title.toLowerCase())
    return item.title.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  console.log(filteredMovie)
  res.render('index', { movie: filteredMovie, keyword: keyword })
})


app.listen(port, () => {
  console.log(`This is Server Running at http://localhost:${port}`)

})

