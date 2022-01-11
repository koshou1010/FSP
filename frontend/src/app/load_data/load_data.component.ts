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
  worksheet : any;

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

  process_data(worksheet){
    let data = XLSX.utils.sheet_to_json(worksheet);
    let sensor_list = ['NO2', 'SO2', 'O3', 'CO', 'Temp']
    var total_data_array = new Array(sensor_list.length);
    for (let k = 0; k < sensor_list.length; k++) {
      var tmp_list = []
      for (let i = 0; i < 10 ; i++){
        // console.log(data[i]['NO2']);
        tmp_list.push(data[i][sensor_list[k]]);
      }
      total_data_array[k] = tmp_list;
    }



    return total_data_array;
  }


  incomingfile(event : any) {
    this.file= event.target.files[0];

  }

  upload() {
    let filereader = new FileReader();
    filereader.onload = (e) => {
      this.arraybuffer = filereader.result;
      let data = new Uint8Array(this.arraybuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
      let cols_list = XLSX.utils.sheet_to_json(this.worksheet);
      let keys = Object.keys(cols_list[0]).sort();
      console.log(keys);
      var tmp_list = []
      for (let i = 0; i < keys.length; i++) {
        tmp_list.push(keys[i]);
      }
      var id = "temp0";
      var li = document.getElementById(id);
      li.innerHTML = tmp_list.toString();
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

  }
  plot_data(){
    this.loading_data = true;
    if (this.loading_data == true) {
      this.plot_blank_dom.destroy();
    }
    var data_cleaned = this.process_data(this.worksheet);
    let xs = [1,2,3,4,5,6,7,8,9,10];
    let vals = data_cleaned;
    let data = [
      xs,
      vals[0],
      vals[1],
      vals[2],
      vals[3],
      vals[4],

    ];
    const opts = {
      width: 800,
      height: 400,
      title: "Plot Data",
      scales: {
        x: {
          time: false,
        },
      },
      series: [
        {},
        {
          label: "NO2",
          stroke: "red",
        },
        {
          label: "SO2",
          stroke: "green",
        },
        {
          label: "O3",
          stroke: "blue",
        },
        {
          label: "CO",
          stroke: "orange",
        },
        {
          label: "Temp",
          stroke: "purple",
        },
      ],
    };
    let plot_data_dom = new uPlot(opts, data, document.body);

  }
  constructor() { }
  ngOnInit(): void {
    if (this.loading_data == false){
      this.plot_blank_fig();
    }
  }
}
