import React, {useState} from 'react';
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card';
import './App.css';
import axios from 'axios';
//
const db = [
  {
    name: 'Richard Hendricks',
    url: './img/mac.jpg',
  },
  {
    name: 'Erlich Bachman',
    url: './img/mac.jpg',
  },
  {
    name: 'Monica Hall',
    url: './img/mac.jpg',
  },
  {
    name: 'Jared Dunn',
    url: './img/mac.jpg',
  },
  {
    name: 'Dinesh Chugtai',
    url: './img/mac.jpg',
  },
];

function Simple() {
  const chars = db;
  const [saved, setSaved] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  //const [chars, setchars] = useState([])
  const [query, setQuery] = useState('');
  const [finished, setFinished] = useState(false);

  const loadchars = () => {
    console.log(query);
    axios
      .put('https://localhost:8080/search', {query: query})
      //.then((response ) => {setchars(response.data)})
      .catch((e) => console.log(e));

    setQuery('');
  };
  const swiped = (direction, character) => {
    console.log('removing: ' + character.name);
    setLastDirection(direction);
    checkSaved(direction, character);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const checkSaved = (lastDirection, character) => {
    console.log('hello' + character.name);
    if (lastDirection === 'right') {
      setSaved((previousState) => previousState.concat(character));
      // saved.push(name)
      // console.log(saved.length)
    }
  };

  const savedClick = () => {
    setFinished(true);

    console.log(saved);

    chars.forEach((entry) => {
      if (saved.includes(entry.name)) {
        console.log(entry);
      }
    });
  };

  return finished ? (
    <div>
      <input type="text" value={query} onChange={handleChange} />
      <button onClick={loadchars}> Send Query</button>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>Saved Posts</h1>
      <div className="cardContainer">
        {saved.map((character) => {
          return (
            <TinderCard
              className="swipe"
              key={character.location}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div className="card">
                <img src={character.url} className="img1" />
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          );
        })}
      </div>
      </div>
  ) : (
    <div>
      <input type="text" value={query} onChange={handleChange} />
      <button onClick={loadchars}> Send Query</button>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>Pic Perfect</h1>
      <div className="cardContainer">
        {chars.map((character) => {
          return (
            <TinderCard
              className="swipe"
              key={character.location}
              onSwipe={(dir) => swiped(dir, character)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div className="card">
                <img src={character.url} className="img1" />
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          );
        })}
      </div>
      <br /> <br /> <br /> <br /> <br />
      <br /> <br />
      <div>
        <button onClick={savedClick}> SAVED </button>
      </div>
      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )}
      </div>
  );
}

export default Simple;
