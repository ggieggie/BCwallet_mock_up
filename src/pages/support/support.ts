import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertController, NavController, ToastController, ViewController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-user',
  templateUrl: 'support.html'
})
export class SupportPage {

  submitted: boolean = false;
  supportMessage: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,public viewCtrl: ViewController
  ) {

  }

  /*
  //動作がおかしくなるので殺した
  ionViewDidEnter() {
    let toast = this.toastCtrl.create({
      message: 'This does not actually send a support request.',
      duration: 3000
    });
    toast.present();
  }
  */

  submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.supportMessage = 'test';
      this.submitted = false;

      let toast = this.toastCtrl.create({
        message: 'Your support request has been sent.',
        duration: 3000
      });
      toast.present();
    }
  }

  public returntabs() {
    this.viewCtrl.dismiss();
  }

}
