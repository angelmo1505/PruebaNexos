import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { ConsulDataService } from 'src/app/services/consul-data.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  scanSubscription;
  scanSub: any;
  qrText: string;
  dataUsers: any;

  constructor(
    private router: Router,
    private qrScanner: QRScanner,
    private toastCtrl: ToastController,
    public platform: Platform,
    private consulData: ConsulDataService,
    private nativeStorage: NativeStorage
  ) {
    
    this.platform.backButton.subscribeWithPriority(0, () => {
      document.getElementsByTagName('body')[0].style.opacity = '1';
      this.scanSub.unsubscribe();
    });
  }

  generateQr(){
    this.router.navigate(['/generateqr']);
  }

  dataUser(){
    this.nativeStorage.getItem('loggedIn').then(
      data => {
        this.consulData.getDataUser(data['dataUser']).subscribe(
          allData => {
            console.log("allDAta => ",allData);           
            this.dataUsers = allData;
          }
        );
      }
    );
  }

  scanCode(){  
    this.dataUser();
    // Optionally request the permission early
    this.qrScanner.prepare().
      then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show();
          this.scanSub = document.getElementsByTagName('body')[0].style.opacity = '0';
          
          this.scanSub = this.qrScanner.scan()
            .subscribe((textFound: string) => {
              document.getElementsByTagName('body')[0].style.opacity = '1';
              this.qrScanner.hide();
              this.scanSub.unsubscribe();

              this.qrText = textFound;
              this.tranferUser(this.qrText);
            }, (err) => {
              alert(JSON.stringify(err));
            });

        } else if (status.denied) {
        } else {

        }
      })
      .catch((e: any) => console.log('Error is', e));
  }
  

  stopScanning() {
    (this.scanSubscription) ? this.scanSubscription.unsubscribe() : null;
    this.scanSubscription=null;
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }

  tranferUser(data){
    
    if(data.length > 0){
      let dataTransfer = data.split(',');
      if(this.dataUsers[0].id_user_system == dataTransfer[3] ){
        swal({
          title: "Error",
          text:  "No se puede realizar la transaccion",
          icon:  "error",
        });
      }else{
        const dataServ = {
          nameDest  : dataTransfer[0],
          numberAccountDest : dataTransfer[1],
          valTransferDest : dataTransfer[2],
          id_user_systemDest: dataTransfer[3],
          numberAccount: this.dataUsers[0].number_account,
          balance_account: this.dataUsers[0].balance_account - dataTransfer[2] ,
          id_user_system: this.dataUsers[0].id_user_system,
        };
        this.consulData.updateDataUser(dataServ).subscribe(
          async resp => {
            console.log("resp servidor =>" ,resp);
            let toast = await this.toastCtrl.create({
              header: "Tranferencia realizada correctamente.",
              duration: 3000
            });
            toast.present();
          },
          async error => {
            console.log("error en la transfer => ", error);
            let toast = await this.toastCtrl.create({
              header: "Hubo un error al realizar la transferencia.",
              duration: 3000
            });
            toast.present();
          }
        );
      }
    }    
  }

}
