    const searchResults = document.querySelector('#searchResults')
    const searchButton = document.querySelector('#searchButton')
    const form = document.querySelector('form')
    const apiUrl = "https://itunes.apple.com/search?entity=musicTrack&term=";
    const currentSongContainer = document.getElementById('currentSongContainer');
    const musicPlayerContainer = document.getElementById('musicPlayerContainer');
    let input = document.querySelector('#search-input')
    let musicPlayer;

    function replaceSpaces(searchQuery) {
        return searchQuery.replace(/ /g, '+');
    }

    function createMusicPlayer() {
        if (!musicPlayer) {
            musicPlayer = document.createElement('audio');
            musicPlayer.controls = true;
            musicPlayer.preload = 'auto';
            musicPlayerContainer.appendChild(musicPlayer);
        }
        return musicPlayer;
    }

    function createResults(results) {
        for (let song of results) {
            let songBox = document.createElement("div");
            songBox.classList.add("songBox");
            //songBox img
            let image = document.createElement("img");
            image.classList.add("image");
            let figure = document.createElement("figure");
            figure.classList.add("imageBox");
            figure.appendChild(image);
            image.src = song.artworkUrl100;
            songBox.appendChild(image);
            let title = document.createElement("div");
            title.classList.add("title");
            title.innerText = song.trackName;
            songBox.appendChild(title);
            let artistDiv = document.createElement("div");
            artistDiv.classList.add('artist');
            artistDiv.innerText = song.artistName;
            searchResults.appendChild(songBox);
            songBox.appendChild(artistDiv);

            //when click on songBox
            songBox.addEventListener('click', () => {
                const musicPlayer = createMusicPlayer();
                musicPlayer.src = song.previewUrl;
                createNowPlaying(song);
                musicPlayer.play();
                })
        }
    }

    /* what the createNowPlaying HTML looks like:

    <div id=“currentSongContainer”> (only one that’s linked)
        <div id=“currentSongBox”>
            <img id=“currentSongImg”></img>
            <div id=“currentSongInfo”>
                <p id=“currentSongName”></p>
                <p id=“currentSongArtist”></p>
            </div>
        </div>
    <div></div>

    */

    function createNowPlaying(song) {
        while (currentSongContainer.firstChild) {
            currentSongContainer.removeChild(currentSongContainer.firstChild);
        }

        if (musicPlayer.src) {
            musicPlayer.src = song.previewUrl;
            musicPlayerContainer.style.display = 'block';
        } else {
            musicPlayerContainer.style.display = 'none';
        }

        //build "now playing" box
        let currentSongBox = document.createElement("div");
        currentSongBox.id = "currentSongBox";

        //now playing img
        let currentSongImg = document.createElement("img");
        currentSongImg.id = "currentSongImg";
        currentSongImg.src = song.artworkUrl100;

        //now playing info
        let currentSongInfo = document.createElement("div");
        currentSongInfo.id = "currentSongInfo";

        //now playing name
        let currentSongName = document.createElement("p");
        currentSongName.id = "currentSongName";
        currentSongName.textContent = song.trackName;

        //now playing artist
        let currentSongArtist = document.createElement("p");
        currentSongArtist.id = "currentSongArtist";
        currentSongArtist.textContent = song.artistName;

        currentSongBox.appendChild(currentSongImg);
        currentSongBox.appendChild(currentSongInfo);
        
        currentSongInfo.appendChild(currentSongName);
        currentSongInfo.appendChild(currentSongArtist);

        currentSongContainer.appendChild(currentSongBox)
    }

    /* what the createNowPlaying HTML looks like:

    <div id=“currentSongContainer”> (only one that’s linked)
        <div id=“currentSongBox”>
            <img id=“currentSongImg”></img>
            <div id=“currentSongInfo”>
                <p id=“currentSongName”></p>
                <p id=“currentSongArtist”></p>
            </div>
        </div>
    <div></div>

    */

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let searchTerm = apiUrl + replaceSpaces(input.value) + "/"; 
        console.log(searchTerm);
        //clear the previous search before new search
        let searchResults = document.getElementById("searchResults")
        searchResults.innerHTML = '';
        fetch(searchTerm, {
            method: 'GET',
            headers: {'Content-Type': 'application/json' },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data.results)
            while (searchResults.firstChild) {
                searchResults.removeChild(searchResults.firsChild);
            }
            createResults(data.results);
        });
    });

