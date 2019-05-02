import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { UploadService } from '../services/upload.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  constructor(private uploadserv: UploadService, private router: Router) { }
  arrayBuffer: any;
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
  }
  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      var finalfile = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.uploadserv.fileupload(finalfile).subscribe(data => {
      })
      this.router.navigate(['/userslist'])
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  ngOnInit() {
  }

}
