import $ from 'jquery'
import request from 'superagent'
window.$ = $
// Did the above because console was doing something else with $ that made it look like it was taking jquery but it wasn't
let albumList = []
// let preAlbumList = []
// Function to listen for submit on search bar and to get value of input in search bar, send to API, return results and store in variable
$(document).on('submit', '#searchform', function (event) {
  event.preventDefault()
  let $searchterms = $('#searchinput').val()
  console.log($searchterms)
  console.log('Search button clicked')
  request
    .get(`https://itunes.apple.com/search?term=${$searchterms}&media=music`)
    .then(response => {
      let parsedResponse = JSON.parse(response.text)
      // Did above because the iTunes API doesn't return results in JSON format and superagent expects JSON
      console.log(parsedResponse)
      let searchresults = parsedResponse.results
      getTrackInfo(searchresults)
      let joinedalbumList = albumList.join('')
      // console.log (searchresults)
      // resultsToHTML()
      console.log(joinedalbumList)
      insertResults(joinedalbumList)
    }
    )
})

// function
// This make function for one item in array, then call this one in a separate function

// FUNCTION BELOW gets called in above so that searchresults has access to that value?

function getTrackInfo (searchres) {
  searchres.forEach(track => {
    let albumImage = track.artworkUrl100
    let artist = track.artistName
    let songTitle = track.trackName
    let x = resultsToHTML(albumImage, artist, songTitle)
    albumList.push(x)
    // console.log (albumList)
    // join and push to innerhtml
  })
}
// ${searchresults[i]}

// Function to insert getTrackInfo HTML into HTML
// Do I take searchresults as the argument???// for each or map?

function resultsToHTML (albumImage, artist, songTitle) {
  return `
  <div class = "album-div">
        <img class = "album-img" src="${albumImage}">
        <p class = "artistname">${artist}</p>
        <p class = "songtitle">${songTitle}</p>
      </div>
  `
}

function insertResults (joinedalbumList) {
  $('#search-results-div').append(joinedalbumList)
}

$('.album-div').click(function () {
  console.log("It's working")
})
// Function to play the song when album-div is clicked on  using event listener on search-results-div

// Function to clear results of last search when new search is done?
