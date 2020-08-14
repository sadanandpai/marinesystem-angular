import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ParseSourceFile } from '@angular/compiler';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // longitude: any;
  // latitude: any;
  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    // function geoFindMe() {

  const status = <HTMLElement> document.querySelector('#status');
  const mapLink = <HTMLElement> document.querySelector('#map-link');

  mapLink.href= '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.google.co.in/maps/@${latitude},${longitude}`;
    // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    mapLink.textContent = `Goto Your Location`;
  }

  function error() {
    // status.textContent = 'Unable to retrieve your location';
    status.textContent = '';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

// }

// document.querySelector('#find-me').addEventListener('click', geoFindMe);

// Weather Forecast of Current Location

function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let cloud = document.getElementById("cloudiness");
  let wind = document.getElementById("wind");
  let location = document.getElementById("location");
  let windSpeed = document.getElementById("windSpeed");
  let humidity = document.getElementById("humidity");
  let pressure = document.getElementById("pressure");

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "ca6ab8e3479cbac859280d8590a85fef";

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let url =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=imperial";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let temp = data.main.temp;
        temperature.innerHTML = temp + "° F";
        location.innerHTML = data.name + " (" + latitude + "°, " + longitude + "°)";
        description.innerHTML = data.weather[data.weather.length - 1].main;
        cloud.innerHTML = data.clouds.all + "%";
        wind.innerHTML = data.wind.deg + "° ";
        windSpeed.innerHTML = data.wind.speed + " m/s";
        humidity.innerHTML = data.main.humidity + "%"
        pressure.innerHTML =  data.main.pressure + " hPa";
      });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

getWeather();
    
   }

   onClick(){
    this.router.navigate(['/']);
   }

   

 

}
