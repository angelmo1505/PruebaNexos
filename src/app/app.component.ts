import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private router: Router
  ) {
    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.login();
      this.splashScreen.hide();
    });
  }

  login(){
    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem('loggedIn').then(
        data => {
          console.log("dataComponent => ", data);
          if(data.logIn == 'true' || data.logIn == true){
            console.log("entra true");
            this.router.navigate(['/tabs']);
          }
        }
      );
    });
  }
}
