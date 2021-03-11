const key = 'pk.eyJ1IjoicG9zdHBsYXN0aWMiLCJhIjoiY2tpamJyNm1zMDE0OTJ0czU5cDkyNjE3ciJ9.VRXSaQR1sQoWudM3Bgp9Lg';

const options = {
  lat: 39.329239,
  lng: -82.101257,
  zoom: 12,
  style: 'mapbox://styles/postplastic/ckm2eo8wbakp217l5n95zbvvb',
  pitch: 0
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  museums = loadTable('museums.csv','csv','header');
}


function draw() {
 clear();
  //noFill();
 stroke(255);
 strokeWeight(3);
  //zoom level variable
  const zoom = myMap.zoom();
 const athens = myMap.latLngToPixel(39.3292,-82.1013);
 ellipse(athens.x,athens.y,10 * zoom,10 * zoom);
 if(dist(athens.x,athens.y,mouseX,mouseY)< (zoom * 10)/2){
   fill(0,100); 
  }else{
    fill(255,100);
  }
  
  for(let i = 0; i < museums.getRowCount();i++){
    const latitude = Number(museums.getString(i, 'Latitude'));
    const longitude = Number(museums.getString(i, 'Longitude'));
    const pos = myMap.latLngToPixel(latitude, longitude);
    let place = museums.getString(i,'Museum Name');
    
    //place tooltip variable here
    var size = museums.getString(i,'Revenue');
    size = map(size, 1, 5840349457, 1, 25) + myMap.zoom();
    ellipse(pos.x,pos.y,size,size);
    
    if (dist(pos.x, pos.y, mouseX, mouseY) < size) {
      textSize(32);
      text(place, pos.x, pos.y);
    }
  }
  
  
  

}

$(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false); /* false to get page from cache */
  }, 200);
});


