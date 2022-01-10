import { Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import { ThrowStmt } from '@angular/compiler';
declare var uPlot;

@Component({
  selector: 'app-load_data',
  templateUrl: './load_data.component.html',
  styleUrls: ['./load_data.component.css']
})
export class LoadDataComponent implements OnInit {
  loading_data = false;
  arraybuffer:any;
  file!: File;
  plot_blank_dom:any;

  plot_blank_fig() {
    if (this.loading_data == false){
      let opts = {
        title: "Plot without data",
        width: 800,
        height: 400,
        scales: {
          x: {
            time : false,
            range(u, dataMin, dataMax) {
              if (dataMin == null)
                return [0, 100];
              return [dataMin, dataMax];
            }
          },
          y: {
            range(u, dataMin, dataMax) {
              if (dataMin == null)
                return [0, 100];
              return uPlot.rangeNum(dataMin, dataMax, 0.1, true);
            }
          },
        },
        series: [
          {},
          {},
        ],
      };
      this.plot_blank_dom = new uPlot(opts, null, document.body);

    }
  }

  plot_data(){
    if(this.loading_data == false){
      let xs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
      let vals = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10];
      let data = [
        xs,
        xs.map((t, i) => vals[Math.floor(Math.random() * vals.length)]),
        xs.map((t, i) => vals[Math.floor(Math.random() * vals.length)]),
        xs.map((t, i) => vals[Math.floor(Math.random() * vals.length)]),
      ];
      const opts = {
        width: 800,
        height: 400,
        title: "Area Fill",
        scales: {
          x: {
            time: false,
          },
        },
        series: [
          {},
          {
            stroke: "red",
          },
          {
            stroke: "green",
          },
          {
            stroke: "blue",
          },
        ],
      };
      let plot_data_dom = new uPlot(opts, data, document.body);
    }
  }

  incomingfile(event : any) {
    this.file= event.target.files[0];

  }

  upload() {
    let filereader = new FileReader();
    filereader.onload = (e) => {
      this.arraybuffer = filereader.result;
      var data = new Uint8Array(this.arraybuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
    }
    filereader.readAsArrayBuffer(this.file);
    var data =
    {
      'btn': 'allday',
    }
    $.ajax
    ({
      type: "POST",
      url: "/ajax",
      data: JSON.stringify(data, null, '\t'),
      contentType: 'application/json;charset=UTF-8',
      success: function (result) {
        console.log('ajax successed');
      },
      error: function (result) {
        console.log('ajax error');
      }
    })
    this.plot_data();
    this.loading_data = true;
    if (this.loading_data == true){
      this.plot_blank_dom.destroy();
    }
  }

  constructor() { }
  ngOnInit(): void {
    console.log('HI');
    if (this.loading_data == false){
      this.plot_blank_fig();
    }
  }
}
