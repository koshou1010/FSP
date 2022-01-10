import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit {
  plot_blank_dom: any;

  constructor() { }

  ngOnInit(): void {
    console.log('in ex');
    this.plot_blank_dom.destroy();
  }

}
