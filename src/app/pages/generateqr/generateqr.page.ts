import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController } from '@ionic/angular';
import { ConsulDataService } from 'src/app/services/consul-data.service';

@Component({
  selector: 'app-generateqr',
  templateUrl: './generateqr.page.html',
  styleUrls: ['./generateqr.page.scss'],
})
export class GenerateqrPage implements OnInit {

  qrData : any;
  scannedCode = null;
  elementType = 'canvas';
  private genQr: FormGroup;
  dataUsers: any;
  
  formGen = {
    name: '',
    numberAccount: '',
    valTransfer: '',
    idUserSystem: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private base64ToGallery: Base64ToGallery,
    private toastCtrl: ToastController,
    private nativeStorage: NativeStorage,
    private consulData: ConsulDataService
  ) {
    this.dataUser();
   }

  ngOnInit() {
  }

  dataUser(){
    this.nativeStorage.getItem('loggedIn').then(
      data => {
        this.consulData.getDataUser(data['dataUser']).subscribe(
          allData => {           
            this.dataUsers = allData;  
            for (let i = 0; i < this.dataUsers.length; i++) { 
              this.formGen.numberAccount = this.dataUsers[i].number_account;
              this.formGen.idUserSystem = this.dataUsers[i].id_user_system;
            }
          }
        );
      }
    );
  }

  downloadQR(){
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('/image/jpeg').toString();
    
    let data = imageData.split(',')[1];
    this.base64ToGallery.base64ToGallery(data, 
      {prefix: '_img', mediaScanner: true})
    .then(
        async res => {
          let toast = await this.toastCtrl.create({
            header: "QR almacenado con éxito.",
            duration: 5000
          });
          toast.present();
        },
        error => {
          console.log("error => ", error);
        }
    );
  }

  logForm(){
    this.qrData = this.formGen.name+","+this.formGen.numberAccount+","+this.formGen.valTransfer+","+this.formGen.idUserSystem;
  }
  
}
