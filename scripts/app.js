"use strict"

window.onload = function(){
    displayOptions;
    dropdown.style.display = 'none';
    info.style.display = 'none';

}

const dropdown = document.getElementById('dropdown');
const info = document.getElementById('info');


function displayOptions() {
    const radio = document.querySelector('input[name=radio]:checked').value;
    updateDropdown(radio);
}

function updateDropdown(radio) {
    const dropdown = document.getElementById('dropdown');
    dropdown.innerHTML = ''; // Clear existing options

    if (radio === 'location') {
        info.style.display = 'none';
        dropdown.style.display = 'block';
        const defaultOption = document.createElement('option');
        defaultOption.value = 'blank';
        defaultOption.text = '--Choose Location--';
        dropdown.appendChild(defaultOption);

        locationsArray.forEach(location => {
            const locationOption = document.createElement('option');
            locationOption.value = location;
            locationOption.text = location;
            dropdown.appendChild(locationOption);
        });
       
    } 
    else if (radio === 'type') {
        info.style.display = 'none';
        dropdown.style.display = 'block';
        const defaultOption = document.createElement('option');
        defaultOption.value = 'blank';
        defaultOption.text = '--Choose Type--';
        dropdown.appendChild(defaultOption);

        parkTypesArray.forEach(park => {
            const parkOption = document.createElement('option');
            parkOption.value = park;
            parkOption.text = park;
            dropdown.appendChild(parkOption);
        });
    } 
    else {
        dropdown.style.display = 'none';
    }
}

// Attach displayOptions function to radio button change event
document.querySelectorAll('input[name=radio]').forEach(radioButton => {
radioButton.addEventListener('change', displayOptions);
});

function getValue(){
    const value = dropdown.value;
    displayInfo(value)
}

function displayInfo(value) {
    const radio = document.querySelector('input[name=radio]:checked').value;
    const img = document.getElementById('silhouette');
    const parkcell = document.getElementById('table');

    if (img) {
        img.style.display = 'none';
    }

    const info = document.getElementById('info');
    if (img.style.display == 'none' && info) {
        info.style.display = '';
    }

    let filteredArray;

    if (radio === 'location') {
        filteredArray = nationalParksArray.filter(park => park.State.includes(value))
    } 
    else if (radio === 'type') {
        filteredArray = nationalParksArray.filter(park => park.LocationName.includes(value))
    }
    else if(dropdown.value == 'blank')(
       info.push = 'none'
    )

   
    parkcell.innerHTML = ''; // Clear any existing content before appending
    filteredArray.forEach(park => {
        if(park.Phone === 0){
            park.Phone = 'N/A';
        }
        if(park.Visit === undefined){
            park.Visit = '';
        }
        const parkInfo = document.createElement('tr'); // Create 'parkInfo' inside the loop
        parkInfo.innerHTML = `
            <th scope="row" class="text-center col-2">${park.LocationID}</th>
            <td class="text-center col-2">${park.LocationName}</td>
            <td class="text-center col-2">${park.Address}</td>
            <td class="text-center col-2">${park.Phone}</td>
            <td class="text-center col-2"><a href="${park.Visit}">${park.Visit}</a></td>
        `;
        parkcell.appendChild(parkInfo);
    });
}

dropdown.addEventListener('change', getValue)