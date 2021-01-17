const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);


//try this
//const scrape = require('./scrape');
var index=0;
//remove previous dataset files(so they don't override new window)
async function remove() {
    const { stdout, stderr } = await exec('rm -r apify_storage/datasets/tumblr-dataset/');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  }
remove()
  .catch(err => {
    console.log(err);
  });


app.get('/', (req, res) => {
    res.send("hello!")
  })
const port = 8000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
app.post('/', (req, res) => {

    //JSON write
    var data= {
        keyword: req.body.query, 
    }
    let dataJSON = JSON.stringify(data);
    fs.writeFileSync('apify_storage/key_value_stores/default/INPUT.json', dataJSON);
  
      
    //preform webscraping
    async function scrape() {
      
        const { stdout, stderr } = await exec('apify run --purge');
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
        

        //read json
        index=index+1;//next dataset
        var str = "" + index;
        var pad = "000000000";
        var ans = pad.substring(0, pad.length - str.length) + str;
        const raw_data= fs.readFileSync(`apify_storage/datasets/tumblr-dataset/${ans}.json`);
        var parsed_data=JSON.parse(raw_data);
        var locations=parsed_data.locations;
        var imglinks = parsed_data.imglinks;
        
        //trim
        if (locations.length>=imglinks.length){
          locations=locations.slice(0,imglinks.length);
        }
        else{
          imglinks=imglinks.slice(0,locations.length);
        }

        //create array
        var formatted_data=[]
        for (let i=0; i<imglinks.length; i++){
          let object= {
            'name': locations[i],
            'url': imglinks[i],
          }
          formatted_data.push(object);
        }
        //console.log(formatted_data);

        //send
        res.send(formatted_data)
    }
    scrape()
    .catch(err => {
        console.log(err);
    });

});