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

// Featured Song Plays

$('.featured-div').click(function (event) {
  event.preventDefault()
  $('#soundbar').html('')
  let previewUrlToHTML = event.currentTarget.dataset.id
  let insertablePreviewHTML = songPreviewToHTML(previewUrlToHTML)
  insertPreview(insertablePreviewHTML)
}
)
