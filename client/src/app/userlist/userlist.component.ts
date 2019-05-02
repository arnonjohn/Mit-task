import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service'

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  rows: any = [];
  columns: any;
  constructor(private uploadserv: UploadService) { }
  getuserdata() {
    this.uploadserv.getuserdata().subscribe(data => {
      this.rows = data['user'];
      this.columns = [
        { prop: 'firstname' },
        { name: 'Lastname' },
        { name: 'Phone' },
        { name: 'Email' },
        { name: 'State' }
      ];
    })
  }
  ngOnInit() {
    this.getuserdata()

  }



}
