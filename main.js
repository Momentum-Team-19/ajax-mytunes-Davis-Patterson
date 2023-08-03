const searchResults = document.querySelector('#searchResults');
const searchButton = document.querySelector('#searchButton');
const form = document.querySelector('form');
const apiUrl = 'https://itunes.apple.com/search?';
const dynamicContainer = document.getElementById('dynamicContainer');
const selectedOption = document.getElementById('searchType');
const errorBox = document.getElementById('errorBox');
let input = document.querySelector('#search-input');
let musicPlayer;
let musicPlayerContainer;

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
