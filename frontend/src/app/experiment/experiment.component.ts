import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit {

  createChk(obj){
    var i = 1;      // COUNTER, FOR CHECKBOX ID.
      if (obj.value !== '') {

        var chk = document.createElement('input');  // CREATE CHECK BOX.
        chk.setAttribute('type', 'checkbox');       // SPECIFY THE TYPE OF ELEMENT.
        chk.setAttribute('id', 'prodName' + i);     // SET UNIQUE ID.
        chk.setAttribute('value', obj.value);
        chk.setAttribute('name', 'products');

        var lbl = document.createElement('label');  // CREATE LABEL.
        lbl.setAttribute('for', 'prodName' + i);

        // CREATE A TEXT NODE AND APPEND IT TO THE LABEL.
        lbl.appendChild(document.createTextNode(obj.value));

        // APPEND THE NEWLY CREATED CHECKBOX AND LABEL TO THE <p> ELEMENT.
        // container.appendChild(chk);
        // container.appendChild(lbl);

        obj.value = '';
        document.getElementById(obj.id).focus();

        i = i + 1;

    }
  }





  constructor() { }
  ngOnInit(): void {

  }

}
