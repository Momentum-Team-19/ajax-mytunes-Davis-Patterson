function replaceSpaces(searchQuery) {
  return searchQuery.replace(/ /g, '+');
}

function createResults(results) {
  //if results = 0
  if (results.length === 0) {
    displayMessage('No results found :(');
    return;
  }

  //if results > 0
  for (let song of results) {
    //create songBox
    let songBox = document.createElement('div');
    songBox.classList.add('songBox');
    //create img
    let image = document.createElement('img');
    image.classList.add('image');
    //create figure
    let figure = document.createElement('figure');
    figure.classList.add('imageBox');
    figure.appendChild(image);
    //img source
    image.src = song.artworkUrl100;
    songBox.appendChild(image);
    let title = document.createElement('div');
    title.classList.add('title');
    title.innerText = song.trackName;
    songBox.appendChild(title);
    let artistDiv = document.createElement('div');
    artistDiv.classList.add('artist');
    artistDiv.innerText = song.artistName;
    searchResults.appendChild(songBox);
    songBox.appendChild(artistDiv);

    //when click on songBox
    songBox.addEventListener('click', () => {
      const musicPlayer = createMusicPlayer();
      musicPlayer.src = song.previewUrl;
      createNowPlaying(song);

      //AUTOPLAYS MUSIC ON CLICK
      // musicPlayer.play();
    });
  }
}

/* what the results html looks like 

<div class="searchResults">
  <div class="songBox">
    <img class="image" src="URL_OF_SONG_ARTWORK" />
    <div class="title">SONG_TITLE</div>
    <div class="artist">ARTIST_NAME</div>
  </div>
</div>

*/

function displayMessage(message) {
  clearMessage();
  const messageBox = document.createElement('div');
  messageBox.id = 'messageBox';
  messageBox.textContent = message;
  searchResults.appendChild(messageBox);

  setTimeout(() => {
    searchResults.removeChild(messageBox);
  }, 2000);
}

function clearMessage() {
  const messageBox = document.getElementById('messageBox');
  if (messageBox) {
    searchResults.removeChild(messageBox);
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

  currentSongBox.appendChild(currentSongImg);
  currentSongBox.appendChild(currentSongInfo);

  currentSongInfo.appendChild(currentSongName);
  currentSongInfo.appendChild(currentSongArtist);

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
