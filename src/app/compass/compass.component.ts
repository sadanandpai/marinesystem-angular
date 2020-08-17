import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.css']
})
export class CompassComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const status = document.querySelector('#status') as HTMLParagraphElement;
    const mapLink = <HTMLAnchorElement> document.querySelector('#map-link');
  
    mapLink.href= '';
    mapLink.textContent = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
      mapLink.href = `https://www.google.co.in/maps/@${latitude},${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °` + `, ` + `Longitude: ${longitude} °`;
      // mapLink.textContent = `Goto Your Location`;
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



    // _______________________ Compass data ______________________
/* 
    // function init() {
      //Find our div containers in the DOM
      var dataContainerOrientation = document.getElementById('dataContainerOrientation');
      var dataContainerMotion = document.getElementById('dataContainerMotion');
 
      //Check for support for DeviceOrientation event
      if(window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event) {
                var alpha = event.alpha;
                var beta = event.beta;
                var gamma = event.gamma;
               
                if(alpha!=null || beta!=null || gamma!=null) 
                  dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
              }, false);
      }
 
      // Check for support for DeviceMotion events
      if(window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', function(event) {
                var x = event.accelerationIncludingGravity.x;
                var y = event.accelerationIncludingGravity.y;
                var z = event.accelerationIncludingGravity.z;
                var r = event.rotationRate;
                var html = 'Acceleration:<br />';
                html += 'x: ' + x +'<br />y: ' + y + '<br/>z: ' + z+ '<br />';
                html += 'Rotation rate:<br />';
                if(r!=null) html += 'alpha: ' + r.alpha +'<br />beta: ' + r.beta + '<br/>gamma: ' + r.gamma + '<br />';
                dataContainerMotion.innerHTML = html;                  
              });
      }
    // }
 */

    // _______ HTML5, rotate the image using alpha value______________
    // function init() {
      var compass = <HTMLImageElement> document.getElementById('compass');
      if((window as any).DeviceOrientationEvent) {
        console.log("Rotating!");

        (window as any).addEventListener('deviceorientation', function(event) {
          debugger
              var alpha;
              var webkitAlpha;
              //Check for iOS property
              if(event.webkitCompassHeading) {
                debugger
                alpha = event.webkitCompassHeading;
                //Rotation is reversed for iOS
                compass.style.webkitTransform = 'rotate(-' + alpha + 'deg)';
              }
              //non iOS
              else {
                debugger
                alpha = event.alpha;
                webkitAlpha = alpha;
                if(!(window as any).chrome) {
                  //Assume Android stock (this is crude, but good enough for our example) and apply offset
                  webkitAlpha = alpha-270;
                }
              }
              debugger
              compass.style.transform = 'rotate(' + alpha + 'deg)';
              compass.style.webkitTransform = 'rotate('+ webkitAlpha + 'deg)';
              //Rotation is reversed for FF
              // compass.style.mozTransform = 'rotate(-' + alpha + 'deg)'; 
            }, false);
      }
    // }

  }

}
