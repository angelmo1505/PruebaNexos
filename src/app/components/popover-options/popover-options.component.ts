import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-options',
  templateUrl: './popover-options.component.html',
  styleUrls: ['./popover-options.component.scss'],
})
export class PopoverOptionsComponent implements OnInit {

  constructor(
    private popoverCtrl: PopoverController,
    private nativeStorage: NativeStorage,
    private router: Router
  ) { }

  ngOnInit() {}

  closePopover(val){
    this.popoverCtrl.dismiss();
    this.nativeStorage.remove('loggedIn');
    this.router.navigate(['']);
  }

}
