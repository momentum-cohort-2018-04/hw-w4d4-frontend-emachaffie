import $ from 'jquery'
import request from 'superagent'
window.$ = $
// Did the above because console was doing something else with $ that made it look like it was taking jquery but it wasn't
let albumList = []

// Function to listen for submit on search bar and to get value of input in search bar, send to API, return results and store in variable

// US iTunes Search
$('#search-button').click(function (event) {
  event.preventDefault()
  // $('.container').empty()
  $('#search-results-div').html('')
  albumList = []
  console.log(albumList)
  let $searchterms = $('#searchinput').val()

  request
    .get(`https://itunes.apple.com/search?term=${$searchterms}&media=music&explicit=yes`)
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
        let previewUrlToHTML = event.currentTarget.dataset.id
        let insertablePreviewHTML = songPreviewToHTML(previewUrlToHTML)
        insertPreview(insertablePreviewHTML)
      })
    }
    )
  document.getElementById('searchform').reset()
})

// Japan iTunes Search
$('#jp-search-button').click(function (event) {
  event.preventDefault()
  // $('.container').empty()
  $('#search-results-div').html('')
  albumList = []
  let $searchterms = $('#jpsearchinput').val()
  // $('.album-div').remove()
  request
    .get(`https://itunes.apple.com/search?term=${$searchterms}&country=jp&lang=ja_jp&media=music&explicit=yes`)
    .then(response => {
      console.log(response)
      let parsedResponse = JSON.parse(response.text)
      // Did above because the iTunes API doesn't return results in JSON format and superagent expects JSON
      console.log(parsedResponse)
      let searchresults = parsedResponse.results
      getTrackInfo(searchresults)
      let joinedalbumList = albumList.join('')
      // console.log(joinedalbumList)
      insertResults(joinedalbumList)

      $('.album-div').click(function (event) {
        event.preventDefault()
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
    albumList.push(x)
    // nowPlayingList.innerText = nowListeningToHTML(songTitle, artist)
  })
  document.getElementById('jpsearchform').reset()
}

// function nowListeningToHTML (songTitle, artist) {
//   return `
//   <p class = "listeningto">"${songTitle}" by ${artist}</p>`
// }

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
  // document.getElementById('nowListening').innerHTML = nowPlayingList
}

// Featured Song Plays

$('.featured-div').click(function (event) {
  event.preventDefault()
  $('#soundbar').html('')
  let previewUrlToHTML = event.currentTarget.dataset.id
  let insertablePreviewHTML = songPreviewToHTML(previewUrlToHTML)
  insertPreview(insertablePreviewHTML)
}
)

// Sticky Player

window.onscroll = function () {
  stickyplayer()
}

var player = document.getElementById('soundbar-div')
var sticky = player.offsetTop

function stickyplayer () {
  if (window.pageYOffset > sticky) {
    player.classList.add('sticky')
  } else {
    player.classList.remove('sticky')
  }
}
