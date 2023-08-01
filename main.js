const searchResults = document.querySelector('#searchResults');
const searchButton = document.querySelector('#searchButton');
const form = document.querySelector('form');
const apiUrl = 'https://itunes.apple.com/search?entity=musicTrack&term=';
const dynamicContainer = document.getElementById('dynamicContainer');
let input = document.querySelector('#search-input');
let musicPlayer;
let musicPlayerContainer;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let searchTerm = input.value.trim();
  if (searchTerm === '') {
    displayMessage('Please enter a search term.');
    return;
  }
  let apiUrlWithSearch = apiUrl + replaceSpaces(searchTerm) + '/';
  console.log(apiUrlWithSearch);
  //clear the previous search before new search
  let searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';
  fetch(apiUrlWithSearch, {
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
      createResults(data.results);
    })
    .catch((error) => {
      displayMessage('An error occured while fetching the results.');
    });
});
