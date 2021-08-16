// const { Client } = require('@elastic/elasticsearch');
// const client = new Client({
//   cloud: {
//     id:
//       'dolphin-project:ZWFzdHVzMi5henVyZS5lbGFzdGljLWNsb3VkLmNvbTo5MjQzJDY2NDU1MWJhNzM0NjQzNTVhMmE5MGZkMTVkZTYxYTM3JDZiNDQ2MjA2YjgyNjRmOTliZTJhNzZiZTcwMjk4Zjdl',
//   },
//   auth: {
//     apiKey: 'WkJ4ZlJuc0IwSmlZa0xsa1QxeW86R3BfWXl3SEhTX2lrZ29URnk4M1J5Zw==',
//   },
// });

// const index = 'dolhpins';

// const express = require('express');
// const app = express();
// const port = 5555;
// // Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded({ extended: true }));
// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());

// app.get('/dolphins', async (req, res) => {
//   let query;

//   if ('fullName' in req.query) {
//     query = {
//       match: { name: req.query.fullName || '' },
//     };
//   } else {
//     query = {
//       match_all: {},
//     };
//   }

//   const result = await client.search({
//     index: index,
//     body: {
//       query: query,
//       size: 20,
//     },
//   });

//   res.json(result.body.hits.hits.map((hit) => ({ name: hit._source.name })));
// });

// const createDoplhin = async (document) => {
//   const esResult = await client.index({
//     index: index,
//     body: document,
//   });

//   console.log('esResult', esResult);
// };

// app.post('/dolphins', async (req, res) => {
//   const dolphinDocument = { name: 'hehe' };
//   await createDoplhin(dolphinDocument);

//   res.json({ created: true });
// });

// app.put('/dolphins/:id', async (req, res) => {
//   const dolphinDocument = { name: req.body.name };

//   // TODO: Update student in DB

//   // Update student in ES
//   const esResult = await client.index({
//     id: req.params.id,
//     index: index,
//     body: dolphinDocument,
//   });

//   console.log('esResult', esResult);

//   res.json({ updated: true });
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
