import $ from 'jquery'
import request from 'superagent'
window.$ = $
// Function to turn input field into searchterm var
// let searchterms = document.getElementById('searchinput').value

// Function to listen for submit on search bar
$(document).on('submit', '#searchform', function (event) {
  event.preventDefault()
  let $searchterms = $('#searchinput').val()
  console.log($searchterms)
  console.log('Search button clicked')
  request
    .get(`https://itunes.apple.com/search?term=${$searchterms}&media=music`)
    // .get('https://itunes.apple.com/search?term=rancid&media=music')
    .then(response => {
      console.log(response.body)
      let searchresults = response.body.results
    }
    )
})

// Function to turn results from API into HTML
function resultsToHTML (searchresults) {
  // Do I take searchresults as the argument???
  return `
  <div class = "album-div">
        <img class = "album-img" src="media/clashalbum.jpg">
        <p class = "artistname">The Clash</p>
        <p class = "songtitle">Death or Glory</p>
      </div>
  `
}

// Function to put HTML divs into HTML

// Function to play the song when album-div is clicked on  using event listener on search-results-div

// Function to clear results of last search when new search is done?
