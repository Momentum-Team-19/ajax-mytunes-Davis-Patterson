const searchResults = document.querySelector('#searchResults')
const searchButton = document.querySelector('#searchButton')
const form = document.querySelector('form')
const apiUrl = "https://itunes.apple.com/search?entity=musicTrack&term="; 
const musicPlayer = document.getElementById('musicPlayer')
const currentSongContainer = document.getElementById('currentSongContainer');
const currentSongImg = document.getElementById('currentSongImg');
const currentSongName = document.getElementById('currentSongName');
const currentSongArtist = document.getElementById('currentSongArtist');
let input = document.querySelector('#search-input')

function replaceSpaces(searchQuery) {
    return searchQuery.replace(/ /g, '+');
}

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
        for (let song of data.results) {
            console.log(`The API returned: ${song.trackName}`)
            let songBox = document.createElement("div");
            songBox.classList.add("songBox");
            songBox.addEventListener('click', () => {
                currentSongImg.style.display = 'none';
                currentSongBox.style.display = 'none';
                currentSongImg.src = '';
                currentSongName.textContent = '';
                currentSongArtist.textContent = '';
                musicPlayer.src = song.previewUrl;
                musicPlayer.play();
                currentSongImg.src = song.artworkUrl60;
                currentSongName.textContent = song.trackName;
                currentSongArtist.textContent = song.artistName;
                currentSongBox.style.display = 'block';
                currentSongImg.style.display = 'block';
            })
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
        }
    });
});

