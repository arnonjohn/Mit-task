import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  { path: '', component: FileuploadComponent },
  { path: 'userslist', component: UserlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
