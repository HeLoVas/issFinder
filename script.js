const worldImg = document.getElementById('worldMap');
const iss = document.getElementById('iss');
const title = document.getElementById('title');
const btnContainer = document.getElementById('btnContainer')
const latLegend = document.getElementById('latLegend');
const longLegend = document.getElementById('longLegend');
const newQuoteBtn = document.getElementById('new-quote');

let loc = {};

async function componentDidMount() {
  const apiUrl = 'http://api.open-notify.org/iss-now.json';
  try {
    const response = await fetch (apiUrl);
    loc = await response.json();
  }catch(error) {
    alert(error);
  }
  mapCenter();
}

async function afterClick () {
  const apiUrl = 'http://api.open-notify.org/iss-now.json';
  try {
    const response = await fetch (apiUrl);
    loc = await response.json();
  }catch(error) {
    alert(error);
  }
  mapCenter();
}
 
function mapCenter () {

  /* CENTERING THE MAP IMAGE AND BUILDING THE SCREEN */

  /* Variables to define the map size*/
  let mapHeight = 0;
  let mapWidth = 0;

  /*Variables to calculate the latitude and longitude of the ISS*/
  let lat = loc.iss_position.latitude;
  let long = loc.iss_position.longitude;

  /* Variables for the map position on the page*/
  let topOffset = 0;
  let leftOffset = 0;

  /* Variables for setting up the iss current position*/
  let mapHeightUnit = 0;
  let mapWidthUnit = 0;
  let mapCenterHeight = 0;
  let mapCenterWidth = 0;
  let issTop = 0;
  let issLeft = 0;
  iss.style.top = 0;
  iss.style.left = 0;

  /* Verifying the screen apect ratio*/
  let windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  let windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  let screenAspectRatio = windowHeight/windowWidth;

  /* Setting up the size of the map*/
  if (screenAspectRatio < 1) {
    mapHeight = windowWidth * 30/100;
    mapWidth = windowWidth * 60/100;
  }else {
    mapHeight = windowWidth * 40/100;
    mapWidth = windowWidth * 80/100;
  }
  worldImg.style.width = Math.round(mapWidth) + 'px';
  worldImg.style.height = Math.round(mapHeight) + 'px';

  /* Setting the map position on the page*/
  topOffset = Math.round((windowHeight - mapHeight)/2);
  leftOffset = Math.round((windowWidth - mapWidth)/2);
  worldImg.style.top = topOffset + 'px';
  worldImg.style.left = leftOffset + 'px';

  /*Setting up the iss current position*/
  mapHeightUnit = mapHeight/180;
  mapWidthUnit = mapWidth/360;
  mapCenterHeight = topOffset +  mapHeight/2;
  mapCenterWidth = leftOffset + mapWidth/2;
  issTop = mapCenterHeight  - (lat * mapHeightUnit);
  issLeft = mapCenterWidth  + (long * mapWidthUnit);
  iss.style.top = issTop + 'px';
  iss.style.left = issLeft + 'px';

  /*Styling the title*/

/*   title.style.resize = 'both'; */
  title.style.width = Math.round(mapWidth) + 'px';
  title.style.top = (topOffset-100) + 'px';
  title.style.left = leftOffset + 'px';


  btnContainer.style.top = (topOffset+mapHeight) + 'px';
  btnContainer.style.left = leftOffset + 'px';
  newQuoteBtn.style.width = Math.round(mapWidth) + 'px';

/*     latLegend.style.top = (topOffset-10) + 'px';
    latLegend.style.left = leftOffset + 'px'; */
    latLegend.textContent = `Latitude ${lat}`;
    longLegend.textContent = `Longitude ${long}`;

  }

  newQuoteBtn.addEventListener('click', afterClick);
  componentDidMount();