import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.css']
})
export class LoadDataComponent implements OnInit {
  arraybuffer:any;
  file!: File;

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
  }
  constructor() { }

  ngOnInit(): void {
  }

}
