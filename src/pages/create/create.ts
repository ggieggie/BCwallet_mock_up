import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AngularFire, FirebaseAuthState, AngularFireAuth } from 'angularfire2';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Firebase } from '@ionic-native/firebase';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
  providers: [Firebase]  
})
export class CreatePage {
  
　//インスタンス
  email: string;
  password: string;
  displayName: string;
  authState: FirebaseAuthState;
  coinAddress = null;
  loading: Loading;

  //コンストラクタ
  constructor(public modalCtrl: ModalController, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, public navParams: NavParams,public afauth: AngularFireAuth,
    public angularFire: AngularFire, public viewCtrl: ViewController, public http: Http) {
      console.log('createPage constructor');
    }

  //登録処理
  createUser() {
    console.log('create user');
    this.showLoading();    
    this.angularFire.auth.createUser({
      email: this.email,
      password: this.password
    }).then(_ => {
      console.log('created user');
      this.getNewAddress();
    }).catch(err => {
      let alert = this.alertCtrl.create({
        title: 'エラー',
        subTitle: String(err),
        buttons: ['OK']
      });
        alert.present();        
        this.loading.dismiss();        
    });
  }

  //コインアドレス生成関数
  getNewAddress(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
    var options = new RequestOptions({ "headers": headers });
    var body = {
      method  : "getnewaddress",
      params  : [],
      id    : 0,
      chain_name: "chain1"
    }
    this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
      .map(response => response.json())
      .subscribe(result => {
        console.log("got new address: "+result.result);
        this.coinAddress = result.result;
        this.updateProfile();
        this.grant();
       }, error => {
        console.log(error);// Error getting the data
      });
  }

  grant(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
    var options = new RequestOptions({ "headers": headers });
    var body = {
      method  : "grant",
      params  : [this.coinAddress,"connect,send,receive,create"],
      id    : 0,
      chain_name: "chain1"
    }
    this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
      .map(response => response.json())
      .subscribe(result => {
        console.log("granted");
        this.viewCtrl.dismiss();
        this.loading.dismiss();
        
       }, error => {
        console.log(error);// Error getting the data
        this.loading.dismiss();        
      });
  }

  //プロフィール更新関数
  updateProfile() {
    console.log('displayName:'+this.displayName);
    console.log('coinAddress:'+this.coinAddress);

    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: this.displayName,
      photoURL: this.coinAddress
    }).then(_ => {
      console.log('updated profile');
    }).catch(err => {
      console.log(String(err));
    });
  }

  backLoginPage() {
    var loginModal = this.modalCtrl.create(LoginPage,{},{"enableBackdropDismiss":false});    
    loginModal.present();    
    this.viewCtrl.dismiss();    
  }

  //ローディング表示
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'now loading',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}
