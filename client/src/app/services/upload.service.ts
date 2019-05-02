import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  BaseApiUrl = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  fileupload(file: any) {
    return this.http.post(this.BaseApiUrl + '/upload', { file })
      .map(this.extractData)
      .catch(this.handleError)
  }

  getuserdata() {
    return this.http.get(this.BaseApiUrl + '/userdata')
      .map(this.extractData)
      .catch(this.handleError)
  }

  //extractData
  private extractData(res: Response) {

    let body = res;
    return body || [];
  }
  //handleError
  private handleError(error: any) {

    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
