import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { PopoverController } from '@ionic/angular';
import { PopoverOptionsComponent } from 'src/app/components/popover-options/popover-options.component';
import { AuthService } from 'src/app/services/auth.service';
import { ConsulDataService } from 'src/app/services/consul-data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private dataUser: any;

  constructor(
    private nativeStorage: NativeStorage,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private consulData: ConsulDataService,
    private router: Router
  ) {
    this.dateUser();
  } 

  async openPopover(ev: any){
    let popover = await this.popoverCtrl.create({
      component: PopoverOptionsComponent,
      event: ev,
      mode: 'ios',      
    });
    await popover.present();   
  }

  dateUser(){
    
    this.nativeStorage.getItem('loggedIn').then(
      data => {
        this.consulData.getDataUser(data['dataUser']).subscribe(
          allData => {
            this.dataUser = allData;  
          }
        );
      }
    );
    
  }

  vervar(){
    this.router.navigate(['/view-movements']);    
  }

}
