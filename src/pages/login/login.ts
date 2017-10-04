import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { AngularFire } from 'angularfire2';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //インスタンス
  email: string;
  password: string;
  loading: Loading;
  content: string;

  //コンストラクタ
  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, public navParams: NavParams,
    public angularFire: AngularFire, public viewCtrl: ViewController, public modalCtrl: ModalController) {
      console.log("loginPage constructor");
    }

  //アカウント作成
  public createAccount() {
    console.log('to regiserPage');
    var loginModal = this.modalCtrl.create(CreatePage,{},{"enableBackdropDismiss":false});
    loginModal.present();
    this.viewCtrl.dismiss();
  }

  //ログイン処理
  login() {
    console.log('logining...');
    this.showLoading();
    this.angularFire.auth.login({
      email: this.email,
      password: this.password
    }).then(res => {
      console.log('logined')     
      this.viewCtrl.dismiss();
      this.loading.dismiss();
    }).catch(err => {
      let alert = this.alertCtrl.create({
        title: 'ログインエラー',
        subTitle: String(err),
        buttons: ['OK']
      });   
      alert.present();
      this.loading.dismiss();
      console.log(err);
    });
  }

  //ローディング表示
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'now loading',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  /*
  //エラー表示
  showError(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
  */
}
