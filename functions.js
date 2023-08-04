function replaceSpaces(searchQuery) {
  return searchQuery.replace(/ /g, '+');
}

function createResults(results, selectedOption) {
  //if results = 0
  if (results.length === 0) {
    displayMessage('No results found :(');
    return;
  }
  //if results > 0
  if (selectedOption === 'song' || selectedOption === '') {
    displayMessage('Please Wait...');
    for (let song of results) {
      //create songBox
      let songBox = document.createElement('div');
      songBox.classList.add('songBox');
      //create imageBox
      let imageBox = document.createElement('div');
      imageBox.classList.add('imageBox');
      //create img
      let image = document.createElement('img');
      image.classList.add('image');
      imageBox.appendChild(image);
      //img source
      image.src = song.artworkUrl100;
      songBox.appendChild(imageBox);
      //title
      let title = document.createElement('div');
      title.classList.add('title');
      title.innerText = song.trackName;
      songBox.appendChild(title);
      //artist
      let artistDiv = document.createElement('div');
      artistDiv.classList.add('artist');
      artistDiv.innerText = song.artistName;
      searchResults.appendChild(songBox);
      songBox.appendChild(artistDiv);
      //album
      let albumDiv = document.createElement('div');
      albumDiv.classList.add('genre');
      albumDiv.innerText = song.collectionName;
      songBox.appendChild(albumDiv);
      searchResults.appendChild(songBox);
      //genre
      let genreDiv = document.createElement('div');
      genreDiv.classList.add('genre');
      genreDiv.innerText = song.primaryGenreName;
      songBox.appendChild(genreDiv);
      searchResults.appendChild(songBox);

      //when click on songBox
      songBox.addEventListener('click', () => {
        const musicPlayer = createMusicPlayer();
        musicPlayer.src = song.previewUrl;
        createNowPlaying(song);

        //PLAYS MUSIC ON CLICK
        // musicPlayer.play();
      });
    }
  }
  if (selectedOption === 'artist') {
    displayMessage('Please Wait...');
    for (let song of results) {
      //create artistBox
      let artistBox = document.createElement('div');
      artistBox.classList.add('artistBox');
      //artist
      let artistDiv = document.createElement('div');
      artistDiv.classList.add('artistWrap');
      artistDiv.innerText = song.artistName;
      searchResults.appendChild(artistBox);
      artistBox.appendChild(artistDiv);
      //genre
      let genreDiv = document.createElement('div');
      genreDiv.classList.add('genreBig');
      genreDiv.innerText = song.primaryGenreName;
      artistBox.appendChild(genreDiv);
      searchResults.appendChild(artistBox);

      //when click on artistBox
      artistBox.addEventListener('click', () => {
        newUrl =
          apiUrl +
          'entity=album&term=' +
          replaceSpaces(song.artistName) +
          '&' +
          'entity=musicTrack&term=' +
          replaceSpaces(song.artistName);
        console.log(
          `album= ${song.collectionName}\nartist= ${song.artistName}\nnewUrl=: ${newUrl}`
        );
        displayMessage('Please Wait...');
        fetch(newUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.results);
            while (searchResults.firstChild) {
              clear(searchResults);
            }
            createResults(data.results, 'song');
          });
      });
    }
  }
  if (selectedOption === 'album') {
    displayMessage('Please Wait...');
    for (let song of results) {
      //create albumBox
      let songBox = document.createElement('div');
      songBox.classList.add('songBox');
      //create imageBox
      let imageBox = document.createElement('div');
      imageBox.classList.add('imageBox');
      //create img
      let image = document.createElement('img');
      image.classList.add('image');
      imageBox.appendChild(image);
      //img source
      image.src = song.artworkUrl100;
      songBox.appendChild(imageBox);
      //album
      let album = document.createElement('div');
      album.classList.add('album');
      album.innerText = song.collectionName;
      songBox.appendChild(album);
      //artist
      let artistDiv = document.createElement('div');
      artistDiv.classList.add('artist');
      artistDiv.innerText = song.artistName;
      searchResults.appendChild(songBox);
      songBox.appendChild(artistDiv);
      //genre
      let genreDiv = document.createElement('div');
      genreDiv.classList.add('genre');
      genreDiv.innerText = song.primaryGenreName;
      songBox.appendChild(genreDiv);
      searchResults.appendChild(songBox);

      //when click on songBox
      songBox.addEventListener('click', () => {
        newUrl =
          apiUrl +
          'entity=album&term=' +
          replaceSpaces(song.collectionName) +
          '&' +
          'entity=musicTrack&term=' +
          replaceSpaces(song.artistName);
        console.log(
          `album= ${song.collectionName}\nartist= ${song.artistName}\nnewUrl=: ${newUrl}`
        );
        displayMessage('Please Wait...');
        fetch(newUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.results);
            while (searchResults.firstChild) {
              clear(searchResults);
            }
            createResults(data.results, 'song');
          });
      });
    }
  }
}

/* what the results html looks like 
  
  <div class="searchResults">
    <div class="songBox">
      <div class="imageBox">
        <img class="image" src="">
      </div>
      <div class="title"></div>
      <div class="artist"></div>
    </div>
  </div>
  
  */

function displayMessage(message) {
  clearMessage();
  const messageBox = document.createElement('div');
  messageBox.id = 'messageBox';
  messageBox.textContent = message;
  console.log(message);
  errorBox.appendChild(messageBox);

  setTimeout(() => {
    if (errorBox.contains(messageBox)) {
      errorBox.removeChild(messageBox);
    }
  }, 800);
}

function clearMessage() {
  const messageBox = document.getElementById('messageBox');
  if (messageBox) {
    errorBox.removeChild(messageBox);
  }
}

/* what the createNowPlaying HTML looks like:
    
    <div id="dynamicContainer">
        <div id="playerContainer">
        <div id="currentSongContainer">
            <div id="currentSongBox">
                <img id="currentSongImg" src="song_artwork_url"></img>
            <div id="currentSongInfo">
                <p id="currentSongName">Song Name</p>
                <p id="currentSongArtist">Artist Name</p>
            </div>
            </div>
        </div>
        <div id="musicPlayerContainer">
            <audio controls preload="auto" src="song_preview_url"></audio>
        </div>
        </div>
    </div>
    
    */

function createNowPlaying(song) {
  const playerContainer = document.createElement('div');
  playerContainer.id = 'playerContainer';

  const currentSongContainer = document.createElement('div');
  currentSongContainer.id = 'currentSongContainer';

  //clear current song container
  while (currentSongContainer.firstChild) {
    currentSongContainer.removeChild(currentSongContainer.firstChild);
  }

  if (musicPlayer.src !== song.previewUrl) {
    musicPlayer.src = song.previewUrl;
  }

  if (musicPlayer.src) {
    musicPlayer.src = song.previewUrl;
    if (!musicPlayerContainer) {
      musicPlayerContainer = document.createElement('div');
      musicPlayerContainer.id = 'musicPlayerContainer';
    }

    musicPlayerContainer.style.display = 'block';
  } else {
    musicPlayerContainer.style.display = 'none';
  }

  //build "now playing" box
  let currentSongBox = document.createElement('div');
  currentSongBox.id = 'currentSongBox';

  //now playing img
  let currentSongImg = document.createElement('img');
  currentSongImg.id = 'currentSongImg';
  currentSongImg.src = song.artworkUrl100;

  //now playing info
  let currentSongInfo = document.createElement('div');
  currentSongInfo.id = 'currentSongInfo';

  //now playing name
  let currentSongName = document.createElement('p');
  currentSongName.id = 'currentSongName';
  currentSongName.textContent = song.trackName;

  //now playing artist
  let currentSongArtist = document.createElement('p');
  currentSongArtist.id = 'currentSongArtist';
  currentSongArtist.textContent = song.artistName;

  //now playing album
  let currentAlbumDiv = document.createElement('div');
  currentAlbumDiv.id = 'currentSongGenre';
  currentAlbumDiv.innerText = song.collectionName;

  //now playing genre
  let currentGenreDiv = document.createElement('div');
  currentGenreDiv.id = 'currentSongGenre';
  currentGenreDiv.innerText = `Genre: ${song.primaryGenreName}`;

  currentSongBox.appendChild(currentSongImg);
  currentSongBox.appendChild(currentSongInfo);

  currentSongInfo.appendChild(currentSongName);
  currentSongInfo.appendChild(currentSongArtist);
  currentSongInfo.appendChild(currentAlbumDiv);
  currentSongInfo.appendChild(currentGenreDiv);

  const existingPlayerContainer = document.getElementById('playerContainer');
  if (existingPlayerContainer) {
    dynamicContainer.removeChild(existingPlayerContainer);
  }

  playerContainer.appendChild(currentSongContainer);
  playerContainer.appendChild(musicPlayerContainer);
  dynamicContainer.appendChild(playerContainer);

  currentSongContainer.appendChild(currentSongBox);
}

/* what the createNowPlaying HTML looks like:
    
    <div id="dynamicContainer">
        <div id="playerContainer">
        <div id="currentSongContainer">
            <div id="currentSongBox">
                <img id="currentSongImg" src="song_artwork_url"></img>
            <div id="currentSongInfo">
                <p id="currentSongName">Song Name</p>
                <p id="currentSongArtist">Artist Name</p>
            </div>
            </div>
        </div>
        <div id="musicPlayerContainer">
            <audio controls preload="auto" src="song_preview_url"></audio>
        </div>
        </div>
    </div>
    
    */

function createMusicPlayer() {
  if (!musicPlayer) {
    musicPlayer = document.createElement('audio');
    musicPlayer.controls = true;
    musicPlayer.preload = 'auto';
    musicPlayer.volume - 0.2;
    if (!musicPlayerContainer) {
      musicPlayerContainer = document.createElement('div');
      musicPlayerContainer.id = 'musicPlayerContainer';
    }
    musicPlayerContainer.appendChild(musicPlayer);
  }
  return musicPlayer;
}

function clear(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function constructApiUrl(searchTerm, selectedOption) {
  if (selectedOption === 'song') {
    return apiUrl + 'entity=musicTrack&term=' + replaceSpaces(searchTerm);
  } else if (selectedOption === 'artist') {
    return apiUrl + 'entity=musicArtist&term=' + replaceSpaces(searchTerm);
  } else if (selectedOption === 'album') {
    return apiUrl + 'entity=album&term=' + replaceSpaces(searchTerm);
  } else {
    // Default to musicTrack if no option is selected
    return apiUrl + 'entity=musicTrack&term=' + replaceSpaces(searchTerm);
  }
}

function search() {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let searchTerm = input.value.trim();
    if (searchTerm === '') {
      displayMessage('Please enter a search term.');
      console.log('No search term.');
      return;
    }
    let apiUrlWithSearch = apiUrl + replaceSpaces(searchTerm) + '/';
    console.log(`apiUrlWithSearch is: ${apiUrlWithSearch}`);
    let apiUrlWithType = constructApiUrl(searchTerm, selectedOption.value);
    console.log(`apiUrlWithType is: ${apiUrlWithType}`);
    //clear the previous search before new search
    let searchResults = document.getElementById('searchResults');
    clear(searchResults);
    fetch(apiUrlWithType, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.results);
        while (searchResults.firstChild) {
          clear(searchResults);
        }
        createResults(data.results, selectedOption.value);
      })
      .catch((error) => {
        displayMessage('An error occured :(');
        console.log('An error occured.');
      });
  });
}
