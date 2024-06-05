"use strict"

window.onload = function(){
  addOptions();
}

const submitButton = document.getElementById('submit');
const dropdown = document.getElementById('mountain');

function addOptions() {

  mountainsArray.forEach(mountain => {
    const mountainOption = document.createElement('option');
    mountainOption.value = mountain.name;
    mountainOption.text = mountain.name;
    dropdown.appendChild(mountainOption);
  });

}

function filterMountain(){
  let value = dropdown.value;

  let filteredMountain = mountainsArray.find(mountain => mountain.name == value);
  mountainTemplate(filteredMountain);
}

dropdown.addEventListener('change', filterMountain, async () =>{});

async function mountainTemplate(mountain) {
  let mySunrise = await getSunsetForMountain(`${mountain.coords.lat},${mountain.coords.lng}`);


  document.getElementById("mountains").innerHTML = 
  `
  <div class="row mb-4 justify-content-center">
    <div class="col-sm-11 col-md-8 col-lg-8 col-xl-4 mt-3">
      <div class="card">
        <img style="height: 250px;" class="card-img-top mx-auto d-block mountain-photo" src="images/${mountain.img}">
        <h2 class="mountain-name card-title text-center pt-4">${mountain.name} <span class="species">(${mountain.elevation} feet)</span></h2>
        <hr class="w-100 ">
        <div class="card-body pt-0"
          <h4 class="mountain-desc card-text">${mountain.desc} </h4>
          <hr class="w-100">
          <p class="card-text"><strong>Effort:</strong> ${mountain.effort}</p>
          <hr class="w-100">
          <strong class="card-text">Coordinates:</strong> <strong>lat: </strong>${mountain.coords.lat} & <strong>lng: </strong>${mountain.coords.lng}
          <hr class="w-100">
          <strong class="card-text">Sunrise(UTC):</strong> ${mySunrise.results.sunrise} & <strong class="card-text">Sunset(UTC):</strong> ${mySunrise.results.sunset}
        </div>
      </div>
    </div>
  </div>
    `;
}


async function getSunsetForMountain(lat, lng) {
  let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
  );
  let data = await response.json();
  return data;
}