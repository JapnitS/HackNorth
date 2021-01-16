const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const express = require('express');
const app = express();
const port = 8000

//try this
//const scrape = require('./scrape');

//remove previous dataset files(so they don't override new window)
/*
async function remove() {
    const { stdout, stderr } = await exec('rm -r apify_storage/datasets/tumblr-dataset/');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  }
remove()
  .catch(err => {
    console.log(err);
  });
*/

app.get('/', (req, res) => {
    res.send("hello!")
  })
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
app.post('/search', (req, res) => {
    //performs label detection
    console.log(req) //fix later
    //JSON write
    var data= {
        keyword: req.query, 
    }
    let dataJSON = JSON.stringify(data);
    fs.writeFileSync('apify_storage/key_value_stores/default/INPUT.json', dataJSON);
        
      
    //preform webscraping
    async function scrape() {
        const { stdout, stderr } = await exec('apify run --purge');
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);

        //now, render next screen
        index=index+1;//next dataset
        //res.render(__dirname+"/views/results.html", {index:index}});
        
        //read json


        //create array
        formatted_data=[]
        object= {
            'name': '',
            'url': '',
        }
        
        //send
        res.send(formatted_data)
    }
    scrape()
    .catch(err => {
        console.log(err);
    });

});