//Google maps code
var position = [52.1999722,0.1247423];
var centre = [51.4134011,-1.18405075];
var weymouth = [50.62683,-2.4928438];

function initialize() {

    var myOptions = {
    zoom: 8,
    zoomControl: false,
    scaleControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    streetViewControl: false,
    scaleControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('googlemaps'),
        myOptions);



    posCambridge = new google.maps.LatLng(position[0], position[1]);
    customCentre = new google.maps.LatLng(centre[0], centre[1]);
    posWeymouth = new google.maps.LatLng(weymouth[0], weymouth[1]);

    map.setCenter(customCentre);

    marker = new google.maps.Marker({
    position: posCambridge,
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP
    });
    marker2 = new google.maps.Marker({
    position: posWeymouth,
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

// End google maps

// Globals
var isDark = false;

var topImages = ["images/bg/clouds.jpg",
                    "images/bg/raytrace.png",
                    "images/bg/ld34.png",
                    "images/bg/up.jpg",
                    "images/bg/cambridge_cl.jpg"];
var topImageText = ["<span class='topImage-emphasis'>Volumetric Cloudscapes:</span> An internship graphics project",
                    "<span class='topImage-emphasis'>RayTracer:</span> A Java 3D graphics project",
                    "<span class='topImage-emphasis'>The Forces Awakened:</span> An entry to Ludum Dare",
                    "<span class='topImage-emphasis'>Uncertainty Principle:</span>"+
                        " A Half-Life 2 modification",
                    "Computer Science at the University of Cambridge"];

var topImageHref = ["projects/code/clouds", "projects/code/raytrace", "projects/code/ld34", "projects/maps/uncertainty-principle", "projects/code/cambridge"];
var loader = new PxLoader();

// End globals

for (i=0; i<topImages.length;i++) {
    loader.addImage(topImages[i]);
}
loader.start();
// Cycles through the arrays of images and captions above
loader.addCompletionListener(function(){
    
    // Remove the loading animation
    document.getElementById('spinner').style.display="none";

    // Show the caption card
    document.getElementById('caption').style.display="block";

    // Now loop over all images
    var i =0;

    function nextTopImage() {
    document.getElementById('changeImg').src=topImages[i];
    document.querySelector('.results').innerHTML = topImageText[i];
    document.getElementById('jumbo-card').href = topImageHref[i];
    Materialize.fadeInImage('#changeImg');
    i++;
    if(i==topImages.length) i=0;
    }

    nextTopImage();
    setInterval(nextTopImage, 6000);
});



function toggleTheme()
{
    if(!isDark)
    {
    isDark = true;
    document.getElementById("css-theme").href= "css/dark.css";
    console.log("Switched to dark theme");
    }
    else
    {
    isDark = false;
    document.getElementById("css-theme").href="css/light.css";
    console.log("Switched to light theme");
    }
}