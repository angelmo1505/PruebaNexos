import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class ConsulDataService {

  private url = "http://192.168.1.27/BD_nexos";

  constructor(
    private http: HttpClient,
    private nativeStorage: NativeStorage
  ) {

  }

  getDataUser(data){
    const path = `${this.url}/DataUsers.php`;
    return this.http.post(path, {data});
  }

  updateDataUser(data){
    const path = `${this.url}/TransferUser.php`;
    return this.http.post(path, {data});
  }

  getMovements(data){
    const path = `${this.url}/getMovements.php`;
    return this.http.post(path, {data});
  }
}
