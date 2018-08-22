/* global $ google PxLoader */

// Google maps code
var cambridge = [52.1999722, 0.1247423]
var centre = [51.4889381, 0.121708]
var weymouth = [50.62683, -2.4928438]
var brighton = [50.8399049, -0.1966856]

function initialize () {
  var myOptions = {
    zoom: 8,
    zoomControl: false,
    scaleControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var map = new google.maps.Map(document.getElementById('googlemaps'),
    myOptions)

  var posCambridge = new google.maps.LatLng(cambridge[0], cambridge[1])
  var customCentre = new google.maps.LatLng(centre[0], centre[1])
  var posWeymouth = new google.maps.LatLng(weymouth[0], weymouth[1])
  var posBrighton = new google.maps.LatLng(brighton[0], brighton[1])

  map.setCenter(customCentre)

  new google.maps.Marker({
    position: posCambridge,
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP
  })
  new google.maps.Marker({
    position: posWeymouth,
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP
  })
  new google.maps.Marker({
    position: posBrighton,
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP
  })
}

google.maps.event.addDomListener(window, 'load', initialize)

// End google maps

var topImages = [
  'images/code/banner_forhonor.jpg',
  'images/code/banner_diss.jpg',
  'images/bg/clouds.jpg',
  'images/bg/ld34.png',
  'images/bg/up.jpg',
  'images/bg/cambridge_cl.jpg'
]

var topImageText = [
  '<span class=\'topImage-emphasis\'>For Honor:</span> Gameplay programming at Studio Gobo',
  '<span class=\'topImage-emphasis\'>Parallax-corrected cubemaps:</span> My undergraduate dissertation',
  '<span class=\'topImage-emphasis\'>Volumetric Cloudscapes:</span> An internship graphics project',
  '<span class=\'topImage-emphasis\'>The Forces Awakened:</span> An entry to Ludum Dare',
  '<span class=\'topImage-emphasis\'>Uncertainty Principle:</span>' +
  ' A Half-Life 2 modification',
  'Computer Science at the University of Cambridge'
]

var topImageHref = [
  'projects/code/goboforhonor',
  'projects/code/dissertation',
  'projects/code/clouds',
  'projects/code/ld34',
  'projects/maps/uncertainty-principle',
  'projects/code/cambridge']

var loader = new PxLoader()

// End globals

for (var i = 0; i < topImages.length; i++) {
  loader.addImage(topImages[i])
}
loader.start()

// Cycles through the arrays of images and captions above
loader.addCompletionListener(function () {
  // Remove the loading animation
  document.getElementById('spinner').style.display = 'none'

  // Show the caption card
  document.getElementById('caption').style.display = 'block'

  // Now loop over all images
  var i = 0

  function nextTopImage () {
    $('#top-overlay').css('opacity', 0)

    $('#top-overlay').css('background-image', 'url(' + topImages[i] + ')')
    $('#top-overlay').animate({opacity: '1'}, 1000, function () {
      document.getElementById('top').style.backgroundImage = 'url(' + topImages[i] + ')'
      i = (i + 1) % topImages.length
    })

    $('.results').html(topImageText[i])
    $('#jumbo-card').attr('href', topImageHref[i])
  }
  nextTopImage()
  setInterval(nextTopImage, 6000)
})
