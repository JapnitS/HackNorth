import React, { useState } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import './App.css';
import axios from 'axios'
import pic from './PicPerfectExample2.jpg'
import covid from './stop_covid.jpg'
const querystring = require("querystring"); 

function Simple () {
  
  const [lastDirection, setLastDirection] = useState()
  const [chars, setchars] = useState([])
  const [query, setQuery] = useState("")
  const [saved, setSaved] = useState([]);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadchars = () =>{
    console.log(query)
    setLoading(true)
    axios.post('http://localhost:8000/', querystring.stringify({query: query}))
    .then((response ) => {
      setchars(response.data);
      setLoading(false);
    })


    setQuery("")
  }

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
  
    console.log("saved" , saved);
  
    chars.forEach((entry) => {
      if (saved.includes(entry.name)) {
        console.log(entry);
      }
    });
  };
  const exportBucketList = () =>{
    var output = '';
    output += 'PicPerfect Bucket List:\n\n'
    saved.forEach(element => {
      output += `-${element.name}\n`
    });

    //download it
    const blob = new Blob([output]);
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = "BucketList.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    
  }
  
  const savedPosts = () => {
    return  (
    <div>
      <div class="w3-container w3-content w3-center w3-padding-64 " style={{maxWidth:'800px'}} >
          <h2 class="w3-wide w3-center head-white">YOUR BUCKET LIST</h2>

          <p class="w3-justify"> </p>
        <center>
        {saved.length==0 ? <p>You have no items in your bucket list</p>: <p></p>}
        <div class="go-back-to-search-button"><a style={{textDecoration:'none'}}href='http://localhost:3000'>Create New Bucket List</a></div>

        <link
          href="https://fonts.googleapis.com/css?family=Damion&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
          rel="stylesheet"
        />

        <center>
      <div className="saved-posts">
        {saved.map((character) => {
          
          return (
              <div className="inner-saved">
                <img src={character.url} className="img-saved" />
                <p className="name-saved">{character.name}</p>
              </div>
          );
          
        })}
        </div>
        </center>
        {saved.length==0 ? <div></div> :  (
          <div>
            <p style={{marginTop:'2em'}} class="w3-opacity"><i>Click the button below to save your search!</i></p>
           <button  onClick={exportBucketList}>SAVE</button>
           </div>
        )}

      </center>
      </div>
    </div>
    );
  }
  const returnFunc = () => {
    return(<div></div>);
  }
  
  const findName = (name) => {
    while (name.length > 70){
      let idx=name.lastIndexOf(" ");
      name=name.substring(0,idx);
    }
    return(name);
  }
  const loadPosts = () => {
    return (
      <div >
      <div class="w3-container w3-content w3-center w3-padding-64 " style={{maxWidth:'800px'}} id="search">
          <h2 class="w3-wide w3-center head-white">ENTER A LOCATION</h2>
          <p class="w3-opacity"><i>We'll find all the nearby popular spots for pictures. Please consult with your local COVID-19 regulations before travelling.</i></p>
          <p class="w3-justify"> </p>
          <div class="w3-row w3-padding-32"></div>
        <center>
          <div className="search-combo">
            <input type="text" placeholder="Search a Location" value={query} onChange={handleChange} />
            <button onClick={loadchars}> Submit</button>
          </div>
          <link
            href="https://fonts.googleapis.com/css?family=Damion&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
            rel="stylesheet"
          />
          {console.log(chars.length)}
            {
            chars.length>0 ?
           
            <div className="cardContainer">
              <div>
                <p>Swipe <b>RIGHT</b> to add to bucket list, Swipe <b>LEFT</b> to discard.</p>
                <br></br>
             </div>
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
                    <h5 id="card-title">{findName(character.name)}</h5>
                  </div>
                </TinderCard>
              );
            })}
            </div>: returnFunc()
          }
          {loading ? (
            <p>loading ... </p>
          ):(
            <p></p>
          )}
          {
            chars.length>0 ? (
              <div>
                <button onClick={savedClick}> View Bucket List </button>
              </div>
            ) : (
              <div>
              </div>
          )}

          {lastDirection ? (
            <h2 className="infoText" style={{display: 'None'}}>You swiped {lastDirection}</h2>
          ) : (
            <h2 className="infoText" style={{display: 'None'}}/>
          )}
          </center>
      </div>
      </div>
  
    );

  }


  return (

       <div >
        <div class="w3-bar w3-black w3-card">
            <a class="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
            <a href="#" class="w3-bar-item w3-button w3-padding-large">HOME</a>
            <a href="#search" class="w3-bar-item w3-button w3-padding-large w3-hide-small">SEARCH LOCATION</a>
        </div>


        <div class="w3-content" style={{maxWidth:'2000px',marginTop:'46px'}}></div>

        <div class="mySlides w3-display-container w3-center">
            <img src={pic} style={{width:'100%'}}/>
            <div class="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small">  
            </div>
        </div>
        
        <div class="w3-container w3-content w3-center w3-padding-64" style={{maxWidth:'800px'}} >
            <h1 class="w3-wide" style={{color:'rgb(31,64,88)', fontWeight:'700'}}>PicPerfect</h1>
            <p class="w3-opacity"><b>PicPerfect finds the most popular locations for photos on Tumblr. By searching a location, popular nearby places for pictures are recommended and compiled into a sharable Bucket List. Please consult with your local COVID-19 regulations before travelling.</b></p>
            <svg width="262" height="246" viewBox="0 0 262 246" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M52.4487 198.527C52.5022 204.012 49.2564 205.958 45.2298 205.997C45.1363 205.998 45.0432 205.998 44.9506 205.997C44.7639 205.995 44.5792 205.988 44.3963 205.977C40.7597 205.755 37.9163 203.77 37.8665 198.669C37.815 193.391 44.5044 186.664 45.0062 186.166L45.0071 186.166C45.0261 186.147 45.0359 186.137 45.0359 186.137C45.0359 186.137 52.3951 193.043 52.4487 198.527Z" fill="#BE7A40"/>
<path d="M167.556 198.219C167.609 203.704 164.363 205.65 160.337 205.689C160.243 205.69 160.15 205.69 160.058 205.689C159.871 205.687 159.686 205.68 159.503 205.669C155.867 205.447 153.023 203.462 152.973 198.361C152.922 193.083 159.611 186.355 160.113 185.858L160.114 185.858C160.133 185.839 160.143 185.829 160.143 185.829C160.143 185.829 167.502 192.735 167.556 198.219Z" fill="#BE7A40"/>
<path d="M262 205.295H0V205.911H262V205.295Z" fill="#3F3D56"/>
<path d="M53.3875 102.329C81.6796 102.329 104.615 79.4219 104.615 51.1645C104.615 22.9071 81.6796 0 53.3875 0C25.0954 0 2.16016 22.9071 2.16016 51.1645C2.16016 79.4219 25.0954 102.329 53.3875 102.329Z" fill="#BE7A40"/>
<path d="M115.724 159.658H115.725C128.001 159.658 139.775 164.529 148.456 173.199C157.137 181.87 162.014 193.629 162.014 205.891V205.891H89.4937V185.857C89.4937 178.908 92.2573 172.245 97.1765 167.331C102.096 162.418 108.768 159.658 115.724 159.658Z" fill="#3F3D56"/>
<path d="M123.262 94.347C123.262 94.347 125.278 100.962 124.126 102.976C122.974 104.989 126.141 109.303 131.325 107.29C136.508 105.277 136.796 102.976 136.796 102.976C136.796 102.976 134.781 99.8118 134.205 93.1965L123.262 94.347Z" fill="#FFB9B9"/>
<path d="M96.9121 159.205C96.9121 159.205 86.5451 164.382 91.1526 171.285C93.8308 175.298 98.9414 183.1 102.752 188.93C105.941 193.81 108.387 199.136 110.009 204.733L110.735 207.238L113.614 210.689L119.662 203.786C119.662 203.786 110.735 187.392 110.735 184.228C110.735 181.064 103.535 170.998 103.535 170.998L110.735 166.396C110.735 166.396 102.672 157.192 96.9121 159.205Z" fill="#FFB9B9"/>
<path d="M130.605 177.038C130.605 177.038 130.893 185.091 131.181 188.255C131.419 190.865 129.108 198.173 129.909 206.304C130.398 211.564 130.34 216.861 129.735 222.109L128.589 232.548L137.229 233.411L140.108 209.826C140.108 209.826 141.836 193.144 140.972 187.679L141.26 176.175C141.26 176.175 134.925 173.874 130.605 177.038Z" fill="#FFB9B9"/>
<path d="M115.198 143.53C115.198 143.53 95.0404 156.473 94.7524 160.5C94.7524 160.5 106.271 159.349 106.559 169.416C106.559 169.416 113.471 166.827 115.198 166.252C116.926 165.677 126.141 159.637 126.141 159.637C126.141 159.637 129.885 162.513 129.885 167.115C129.885 171.717 129.597 179.77 129.885 180.345C130.173 180.921 136.796 172.58 142.268 179.77L146.012 159.924C146.012 159.924 147.163 147.844 144.86 146.981L128.733 140.941L115.198 143.53Z" fill="#2F2E41"/>
<path d="M127.438 97.9425C132.209 97.9425 136.077 94.0793 136.077 89.3139C136.077 84.5484 132.209 80.6853 127.438 80.6853C122.666 80.6853 118.798 84.5484 118.798 89.3139C118.798 94.0793 122.666 97.9425 127.438 97.9425Z" fill="#FFB9B9"/>
<path d="M125.277 104.414C125.277 104.414 135.022 106.984 136.341 102.104C136.341 102.104 148.315 104.414 150.331 112.179C152.347 119.945 145.436 138.64 145.436 139.216C145.436 139.791 151.195 143.242 148.603 144.968C146.011 146.694 143.708 144.68 144.86 146.981C146.011 149.282 148.027 149.858 146.299 150.433C144.572 151.008 134.205 142.092 126.141 144.393C118.078 146.694 114.047 144.968 114.047 144.968L110.431 113.758C110.29 112.562 110.451 111.35 110.899 110.233C111.347 109.115 112.069 108.127 112.997 107.36C114.802 105.876 117.197 104.273 119.518 103.839C124.126 102.976 124.317 102.503 124.317 102.503L125.277 104.414Z" fill="#F4F4F4"/>
<path d="M116.062 154.747C116.062 154.747 118.654 169.416 122.11 167.402C125.566 165.389 121.246 154.747 121.246 154.747H116.062Z" fill="#FFB9B9"/>
<path d="M128.092 156.646C128.092 156.646 123.602 170.849 127.598 170.659C131.594 170.47 132.689 159.039 132.689 159.039L128.092 156.646Z" fill="#FFB9B9"/>
<path d="M112.175 206.663C112.175 206.663 110.159 204.362 109.007 207.525C107.855 210.689 104.687 214.716 104.687 214.716C104.687 214.716 97.7761 222.482 102.672 222.769C107.567 223.057 114.478 215.866 114.478 215.866L122.542 208.388C122.542 208.388 119.869 201.888 118.614 201.83C117.358 201.773 117.646 209.539 112.175 206.663Z" fill="#2F2E41"/>
<path d="M130.893 230.535C130.893 230.535 128.864 231.127 129.014 228.674C129.014 228.674 121.678 232.548 123.694 235.424C125.71 238.301 128.013 241.177 128.013 241.177C128.013 241.177 138.668 247.217 139.532 245.779C140.396 244.341 140.396 241.464 139.82 240.314C139.244 239.163 136.365 237.15 137.229 235.424C138.092 233.699 136.941 229.097 135.501 229.097C134.061 229.097 130.893 230.535 130.893 230.535Z" fill="#2F2E41"/>
<path d="M119.898 82.0024C119.898 82.0024 122.677 75.9883 128.004 77.3761C133.33 78.764 136.341 80.8458 136.573 82.9276C136.804 85.0094 136.457 88.1321 136.457 88.1321C136.457 88.1321 135.878 83.8528 132.172 84.7781C128.467 85.7033 122.677 85.0094 122.677 85.0094L121.751 93.3366C121.751 93.3366 120.709 91.8331 119.551 92.7583C118.393 93.6835 116.192 83.8528 119.898 82.0024Z" fill="#2F2E41"/>
<path d="M145.436 111.892C145.436 111.892 138.525 130.587 139.1 132.888C139.676 135.189 139.1 135.477 138.237 136.052C137.373 136.627 135.069 142.667 135.069 142.667C135.069 142.667 133.629 146.118 132.477 146.981C131.325 147.844 131.325 150.145 131.325 150.145C131.325 150.145 128.445 153.021 129.021 153.597C129.597 154.172 129.597 155.035 128.445 155.898C127.294 156.76 126.142 157.911 126.718 158.199C127.294 158.486 131.325 161.65 132.477 161.362C133.629 161.075 131.901 159.924 133.341 159.349C134.781 158.774 135.645 157.911 135.069 157.623C134.493 157.336 132.765 157.336 134.493 156.76C136.221 156.185 142.268 152.446 144.284 147.844C146.3 143.242 155.958 115.4 150.121 111.489C150.121 111.489 147.74 108.44 145.436 111.892Z" fill="#F4F4F4"/>
<path d="M113.471 108.728L113.354 108.777C112.266 109.23 111.305 109.941 110.554 110.848C109.804 111.756 109.286 112.832 109.046 113.985C108.417 116.991 107.798 121.339 108.287 125.41C109.151 132.6 109.727 135.764 110.879 138.065C112.031 140.366 112.319 139.503 112.031 141.229C111.743 142.955 110.303 141.517 111.743 143.818C113.183 146.119 114.047 145.543 113.471 146.694C112.895 147.844 112.031 147.844 113.183 149.282C114.335 150.72 114.335 151.296 114.623 151.871C114.911 152.446 115.774 156.76 115.774 156.76C115.774 156.76 120.382 155.322 122.974 155.898C122.974 155.898 120.67 151.871 121.246 151.008C121.822 150.145 122.686 149.858 121.822 148.995C120.958 148.132 119.518 148.42 120.958 147.557C122.398 146.694 119.806 137.778 119.806 137.778L113.471 108.728Z" fill="#F4F4F4"/>
<path d="M58.3249 205.274H47.8325L52.6158 43.459L58.3249 205.274Z" fill="#3F3D56"/>
<path d="M53.542 74.1269L64.8059 58.5618L53.3877 77.9796L52.1533 75.8221L53.542 74.1269Z" fill="#3F3D56"/>
<path d="M52.3073 89.8461L41.0435 74.281L52.4616 93.6989L53.696 91.5413L52.3073 89.8461Z" fill="#3F3D56"/>
<path d="M58.0866 121.106L53.0088 124.034L54.5518 126.703L59.6296 123.775L58.0866 121.106Z" fill="#3F3D56"/>
</svg>
<br></br>
<svg width="68" height="13" viewBox="0 0 68 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="33.9999" cy="6.68446" r="6.28309" fill="#D6D7D8"/>
<circle cx="61.1034" cy="6.68446" r="6.28309" fill="#D6D7D8"/>
<circle cx="6.8954" cy="6.68446" r="6.28309" fill="#BE7A40"/>
</svg>


            <p class="w3-justify"> </p>
        </div>

        <div class="w3-black" style={{width:'100%'}}>
        {finished ? savedPosts(): loadPosts()}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <img src={covid} style={{maxWidth:'800px'}}/>
        <br></br>
        <br></br>
        <br></br>
        <footer class="w3-bar w3-black w3-card">
        <center>
          <p>© Copyright 2021 Creme de la Creme</p>
          </center>
        </footer>
        </div>

     
        

  )
  
}

export default Simple