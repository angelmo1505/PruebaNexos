import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ConsulDataService } from 'src/app/services/consul-data.service';

@Component({
  selector: 'app-view-movements',
  templateUrl: './view-movements.page.html',
  styleUrls: ['./view-movements.page.scss'],
})
export class ViewMovementsPage implements OnInit {

  private dataUsers: any;
  public dataMovement: any;

  constructor(
    private nativeStorage: NativeStorage,
    private consulData: ConsulDataService,
  ) { 
   
  }

  ngOnInit() {
    this.dateUser();
  }

  dateUser(){    
    this.nativeStorage.getItem('loggedIn').then(
      data => {
        this.consulData.getDataUser(data['dataUser']).subscribe(
          allData => {
            this.dataUsers = allData;  
            
            const dataServ = {
              id_user_system: this.dataUsers[0].id_user_system,
              number_account: this.dataUsers[0].number_account,
            };
            this.consulData.getMovements(dataServ).subscribe(
              resp => {
                this.dataMovement = resp['datos'];
              }
            );
          }
        );
      }
    );    
  }

  

}
