import { Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import { ThrowStmt } from '@angular/compiler';
declare var uPlot;
const COLOR_MAP = ['#4E79A7', '#A0CBE8', '#F28E2B', '#FFBE7D', '#59A14F', '#8CD17D', '#B6992D', '#F1CE63', '#499894', '#86BCB6', '#E15759', '#FF9D9A', '#79706E', '#BAB0AC', '#D37295', '#FABFD2', '#B07AA1', '#D4A6C8', '#9D7660', '#D7B5A6']

@Component({
  selector: 'app-load_data',
  templateUrl: './load_data.component.html',
  styleUrls: ['./load_data.component.css']
})
export class LoadDataComponent implements OnInit {
  plot_done = false;
  loading_data = false;
  plot_data_dom_flag = false;
  arraybuffer:any;
  file!: File;
  plot_blank_dom:any;
  plot_data_dom : any;
  worksheet : any;
  key_list = [];

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
    let sensor_list = this.key_list
    var total_data_array = new Array(sensor_list.length);
    for (let k = 0; k < sensor_list.length; k++) {
      let tmp_list = []
      for (let i = 0; i < data.length ; i++){
        // console.log(data[i]['NO2']);
        tmp_list.push(data[i][sensor_list[k]]);
      }
      total_data_array[k] = tmp_list;
    }

    return total_data_array;
  }


  incomingfile(event : any) {
    this.file= event.target.files[0];
    this.plot_done = false;
  }

  upload() {
    this.key_list = [];
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
      for (let i = 0; i < keys.length; i++) {
        this.key_list.push(keys[i]);
      }
      $("#label1").text(this.key_list[0].toString());
      $("#label2").text(this.key_list[1].toString());
      $("#label3").text(this.key_list[2].toString());
      $("#label4").text(this.key_list[3].toString());
      $("#label5").text(this.key_list[4].toString());
      for (let i = 0; i < this.key_list.length; i++) {
        if (this.key_list[i] == '__EMPTY'){
          this.key_list.splice(i, 1);
        }
      };
      for (let i = 0; i < this.key_list.length; i++) {
        if (this.key_list[i] == 'Time') {
          this.key_list.splice(i, 1);
        }
      };
      for (let i = 0; i < this.key_list.length; i++) {
        if (this.key_list[i] == 'time') {
          this.key_list.splice(i, 1);
        }
      };
    }

    filereader.readAsArrayBuffer(this.file);
    var ajax_data =
    {
      'btn': 'allday',
    }
    $.ajax
    ({
      type: "POST",
      url: "/ajax",
      data: JSON.stringify(ajax_data, null, '\t'),
      contentType: 'application/json;charset=UTF-8',
      success: function (result) {
        console.log('ajax successed');
      },
      error: function (result) {
        console.log('ajax error');
      }
    })

    $("#cbox1").click(function () {
      if ($(this).is(':checked')) {
        console.log('its1');
      }
    });
    $("#cbox2").click(function () {
      if ($(this).is(':checked')) {
        console.log('its2');
      }
    });
    $("#cbox3").click(function () {
      if ($(this).is(':checked')) {
        console.log('its3');
      }
    });
    $("#cbox4").click(function () {
      if ($(this).is(':checked')) {
        console.log('its4');
      }
    });
    $("#cbox5").click(function () {
      if ($(this).is(':checked')) {
        console.log('its5');
      }
    });

  }

  plot_data(){
    if(this.plot_done == false){
      if (this.plot_data_dom_flag == true){
        this.plot_data_dom.destroy();
      }
      let opts;
      let data_for_plot = [];
      opts = {
        width: 800,
        height: 400,
        title: "Plot Data",
        scales: {
          x: {
            time: false,
          },
        },
        series: [{ label: 'x-axis',},],
      };
      this.loading_data = true;
      if (this.loading_data == true) {
        this.plot_blank_dom.destroy();
      }
      var data_cleaned = this.process_data(this.worksheet);
      var x_axis = [];
      for (let i = 0; i < data_cleaned[0].length; i++) {
        x_axis.push(i+1);
      }
      let xs = x_axis;
      data_for_plot= [xs,];
      for (let i = 0; i < data_cleaned.length; i++) {
        data_for_plot.push(data_cleaned[i]);
      }
      for (let i = 0; i < data_for_plot.length-1; i++) {
        opts.series.push({
          label: this.key_list[i],
          stroke: COLOR_MAP[i],
        });
      }
      this.plot_data_dom = new uPlot(opts, data_for_plot, document.body);
      this.plot_data_dom_flag = true;
      this.plot_done = true;
    }
  }

  constructor() {}
  ngOnInit(): void {
    if (this.loading_data == false){
      this.plot_blank_fig();
    }
  }
}
