const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

let persons = [
      {
        name: "Arto Hellas",
        number: "041-123456",
        id: 1
      },
      {
        name: "Martti Tienari",
        number: "042-123456",
        id: 2
      },
      {
        name: "Arto Järvinen",
        number: "043-123456",
        id: 3
      },
      {
        name: "Lea Kutvonen",
        number: "044-123456",
        id: 4
      },
      {
        name: "Prajil Limbu",
        number: "045-123456",
        id: 5
      }
]


app.get('/', (req, res) => {
  res.send('Hello there!')
})

app.get('/api/persons', (req, res) => {
  console.log('Read');
  res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id )
    if ( person ) {
      console.log('Read');
      res.status(200).send(person)
    } else {
      res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const newpersons = persons.filter(person => person.id !== id)
    res.send(newpersons)
    console.log('Deleted');
    res.status(204).end()
})

const generateId = () => {
  const newId = persons.map(i => i.id)
  return Math.max(...newId) + 1
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (body.name === undefined || body.number === undefined) {
      return res.status(400).json({error: 'name or number must be unique'})
    }
    const entry = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
    persons = persons.concat(entry)
    console.log('Created');
    res.json(entry)
})

app.put('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const newperson = persons.find(person => person.id === id)
  console.log('Edited');
  res.status(204).send(newperson)
})

const PORT = process.env.PORT ||  3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})