import $ from 'jquery'
import request from 'superagent'
window.$ = $
// Did the above because console was doing something else with $ that made it look like it was taking jquery but it wasn't
let albumList = []
// let previewList = []

// $('.album-div').click(function (event) {
//   event.preventDefault()
//   $('#newSoundbar').html('')
// })

// Function to listen for submit on search bar and to get value of input in search bar, send to API, return results and store in variable
$(document).on('submit', '#searchform', function (event) {
  event.preventDefault()
  // $('.container').empty()
  $('#search-results-div').html('')
  let $searchterms = $('#searchinput').val()
  // $('.album-div').remove()
  // console.log($searchterms)
  // console.log('Search button clicked')
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

      $('.album-div').click(function (event) {
        event.preventDefault()
        // let previewUrl =
        // console.log(previewUrl)
        // $('#newSoundbar').remove()
        let previewUrlToHTML = event.currentTarget.dataset.id
        let insertablePreviewHTML = songPreviewToHTML(previewUrlToHTML)
        insertPreview(insertablePreviewHTML)
      })
    }
    )
})

function getTrackInfo (searchres) {
  searchres.forEach(track => {
    let albumImage = track.artworkUrl100
    let artist = track.artistName
    let songTitle = track.trackName
    let previewUrl = track.previewUrl
    let x = resultsToHTML(previewUrl, albumImage, artist, songTitle)
    // let y = songPreviewToHTML(previewUrl)
    albumList.push(x)
    // previewList.push(y)
  })
}

function resultsToHTML (previewUrl, albumImage, artist, songTitle) {
  return `
  <div class = "album-div" data-id="${previewUrl}">
        <img class = "album-img" src="${albumImage}">
        <p class = "artistname">${artist}</p>
        <p class = "songtitle">${songTitle}</p>
      </div>
  `
}

function insertResults (joinedalbumList) {
  $('#search-results-div').html(joinedalbumList)
}

// Soundbar Functions

// HTML for inserting previewUrl
function songPreviewToHTML (previewUrl) {
  return `<source id = "newSoundbar" src="${previewUrl}" type="audio/mpeg">`
}

function insertPreview (previewList) {
  $('#soundbar').html('')
  $('#soundbar').html(previewList).trigger('load').trigger('play')
}

// function myFunction() {
//   document.getElementById("mp4_src").src = "movie.mp4";
//   document.getElementById("ogg_src").src = "movie.ogg";
//   document.getElementById("myVideo").load();

// Function to play the song when album-div is clicked on  using event listener on search-results-div
// $('.album-div').click(function (event) {
//   event.preventDefault()
//   console.log('Album div clicked')
//   let $searchterms = $('#searchinput').val()
//   console.log($searchterms)
//   console.log('Search button clicked')
//   request
//     .get(`https://itunes.apple.com/search?term=${$searchterms}&media=music`)
// .then(response => {
//   let parsedResponse = JSON.parse(response.text)
//   // Did above because the iTunes API doesn't return results in JSON format and superagent expects JSON
//   console.log(parsedResponse)
//   let searchresults = parsedResponse.results
//   getTrackInfo(searchresults)
//   let joinedalbumList = albumList.join('')
//   // console.log (searchresults)
//   // resultsToHTML()
//   console.log(joinedalbumList)
//   insertResults(joinedalbumList)
// }
// )

// get previewurl from API
// Previewurl gets put into player html
// Preview autoplays

// })

// Function to clear results of last search when new search is done?
