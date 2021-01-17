import React, { useState } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import './App.css';
import axios from 'axios'
const querystring = require("querystring"); 

function Simple () {
  
  const [lastDirection, setLastDirection] = useState()
  const [chars, setchars] = useState([])
  const [query, setQuery] = useState("")

  const loadchars = () =>{
    console.log(query)
    axios.post('http://localhost:8000/', querystring.stringify({query: query}))
    .then((response ) => {setchars(response.data)})
    
    /*
    var http = new XMLHttpRequest();
    var url = 'get_data.php';
    var params = 'orem=ipsum&name=binny';
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(params);
    */

    setQuery("")
  }
  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
  
    console.log(name + ' left the screen!')
  }
  const handleChange = (event) => {
    
    setQuery(event.target.value)
  }

  return (
    <div>
    <input type="text" value={query} onChange={handleChange} />
    <button onClick={loadchars}> Send Query</button>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {chars.map((character) =>
          { console.log(character.url);
            return(
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div className='card'>
            <img src={character.url} className="img1"/>
            {console.log()}
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
            )}
        )}
          
      </div>
          
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  )
  
}

export default Simple