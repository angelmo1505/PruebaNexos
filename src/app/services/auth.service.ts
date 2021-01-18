import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userName: String;
  loggedIn: boolean;

  private url = "http://192.168.1.27/BD_nexos";

  constructor(
    private http: HttpClient,
    private nativeStorage: NativeStorage
  ) {
    this.userName = "";
    this.loggedIn = false;
   }

  login(userInfo){
    const path = `${this.url}/LoginUser.php`;
    return this.http.post(path, userInfo);
  }

  logout(){
    this.nativeStorage.remove('loggedIn')
    .then(
      data => console.log("dataOut => ", data),
      error => console.log("errorOut => ",error)
    );
  }

  public isLoggedIn(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem('loggedIn')
      .then(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      ); 
    });  
  }
}
