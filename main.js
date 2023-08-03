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

search();
