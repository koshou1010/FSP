import { Component } from '@angular/core';
declare var uPlot;
var loading_data = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  ngOnInit() {
    console.log("main");
  }
}

