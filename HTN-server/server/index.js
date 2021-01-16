const express = require('express')
const request = require('request');
const app = express()
const port = 3000
var tag = "italyscenes"
var end_cursor = ''
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
//         url:"https://instagram.com/graphql/query/?query_id=17888483320059182&id=<user_id>&first=12&after=<end_cursor>",
//         //url: "https://www.instagram.com/explore/tags/"+tag+"/?__a=1&max_id="+end_cursor+"",
        
//         method: 'GET',
//         json: {},
//         qs: {
//           offset: 20
//         }
        
//       };
//       request(requestOptions, (err, response, body) => {
//         if (err) {
//           console.log(err);
//         } else if (response.statusCode === 200) {
//           console.log(body);
//         } else {
//           console.log(response.statusCode);
//         }
//       });
      
      


// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
