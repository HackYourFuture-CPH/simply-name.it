// const { Client } = require('@elastic/elasticsearch')
// const client = new Client({
//   cloud: {
//     id: 'hyf-simply-nameit:d2VzdGV1cm9wZS5henVyZS5lbGFzdGljLWNsb3VkLmNvbTo5MjQzJGY1ODk2MTY5NWM0ZTQwN2ZhZjBkYTRlZGQzY2U4YTZlJDkzMjNlMWE2ZmVmYTRlYWM5ZjcyYmM2NDVhNGNkYWRh',
//   },
//   auth: {
//     apiKey: 'R2RidE5Ic0I4M0hXLXlDcjdfelM6b0E0SWRGUV9Uc3FsOE0yNVYzU2RhZw=='
//   }
// })

// const index = 'testing-in-class'

// const express = require('express')
// const app = express()
// const port = 3000

// // Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded({ extended: true }));
// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());

// app.get('/students', async (req, res) => {
//   let query

//   if ('fullName' in req.query) {
//     query = {
//       match: { name: req.query.fullName || '' }
//     }
//   } else {
//     query = {
//       match_all: {}
//     }
//   }

//   const result = await client.search({
//     index: index,
//     body: {
//       query: query,
//       size: 20
//     }
//   })

//   res.json(result.body.hits.hits.map(hit => ({ name: hit._source.name })))
// })

// const createStudent = async (document) => {
//   // TODO: Create student in DB
//   // const dbResult = await knex('students').insert(document, 'id')

//   // Create student in ES
//   const esResult = await client.index({
//     // id: dbResult.id, // TODO: set this to the ID from the DB
//     index: index,
//     body: document
//   })

//   console.log('esResult', esResult)
// }

// app.post('/students', async (req, res) => {
//   const studentDocument = { name: req.body.name }
//   await createStudent(studentDocument)

//   res.json({ created: true })
// })

// app.put('/students/:id', async (req, res) => {
//   const studentDocument = { name: req.body.name }

//   // TODO: Update student in DB

//   // Update student in ES
//   const esResult = await client.index({
//     id: req.params.id,
//     index: index,
//     body: studentDocument
//   })

//   console.log('esResult', esResult)

//   res.json({ updated: true })
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
