import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, ModalController, IonicPage, LoadingController, Loading } from 'ionic-angular';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';


/**
 * Generated class for the TopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top',
  templateUrl: 'top.html',
  providers: [AngularFire]
})
export class TopPage {

  //インスタンス
  username = '';
  email = '';
  cafene_balance = null;
  maru_balance = null;
  coinAddress = '';
  loading: Loading;
  private authState: FirebaseAuthState;


  constructor(public navCtrl: NavController, public http: Http,
    public angularFire: AngularFire, public modalCtrl: ModalController, 
    private loadingCtrl: LoadingController) {

      console.log("topPage constructor");      
      //認証
      angularFire.auth.subscribe((state : FirebaseAuthState) => {
        this.authState = state;
        console.log("check state");
        
        if(this.authState != null) {
          
          // 認証情報がnullでない場合（認証できている場合） 
          console.log('already logined');
          if(this.maru_balance == null){ 
            this.getProfile();
            this.getCafenebalance();
            this.getMarubalance();
          }  

        } else {

          // 認証情報がnullの場合（認証できていない場合） ログインページへ
          console.log('to loginPage');
          let loginModal = this.modalCtrl.create(LoginPage,{},{"enableBackdropDismiss":false});
          loginModal.present();
        }
    });
  }

  //topのreloadボタン用関数
  reload(){
    this.getProfile();
    this.getCafenebalance();
    this.reloadGetMarubalance();  
  }

  //ビットコインの値を確認する関数
  getCafenebalance() {
    this.cafene_balance = 100;
  }

  //マルコインの値を確認する関数
  getMarubalance() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
    var options = new RequestOptions({ "headers": headers });
    var body = {
      method  : "getaddressbalances",
      params  : [this.coinAddress],
      id    : 0,
      chain_name: "chain1"
    }
    this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
      .map(response => response.json())
      .subscribe(result => {
        //console.log("data: "+JSON.stringify(result));
        if(JSON.stringify(result.result) == "null" || JSON.stringify(result.result) == "[]"){
          console.log("no balance");
          this.maru_balance = 0;
        }else{
        console.log("qty: "+JSON.stringify(result.result[0].qty));
        this.maru_balance = JSON.stringify(result.result[0].qty);
        }
       }, error => {
        console.log(error);// Error getting the data
      });
  }

  //reload&マルコインの値を確認する関数
  reloadGetMarubalance() {
    this.showLoading();
    this.maru_balance = null;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
    var options = new RequestOptions({ "headers": headers });
    var body = {
      method  : "getaddressbalances",
      params  : [this.coinAddress],
      id    : 0,
      chain_name: "chain1"
    }
    this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
      .map(response => response.json())
      .subscribe(result => {
        console.log("data: "+JSON.stringify(result));
        if(JSON.stringify(result.result) == "null" || JSON.stringify(result.result) == "[]"){
          console.log("no balance");
          console.log(result);
          this.maru_balance = 0;

        }else{
        console.log("name: "+JSON.stringify(result.result[0].name));          
        console.log("qty: "+JSON.stringify(result.result[0].qty));
        this.maru_balance = JSON.stringify(result.result[0].qty);
        }
        this.loading.dismiss();        
        }, error => {
        console.log(error);// Error getting the data
        this.loading.dismiss();        
      });
  }

  //ログアウト
  public logout() {
    this.username = '';
    this.email = '';
    this.cafene_balance = null;
    this.maru_balance = null;
    this.coinAddress = '';
    console.log("logout");
    this.angularFire.auth.logout();    
  }

  //情報取得
  public getProfile() {
    var user = firebase.auth().currentUser;
    this.username = user.displayName;
    this.coinAddress = user.photoURL; 
  }

  //ローディング表示
  showLoading() {
    if(this.loading){
      this.loading.dismiss();
    }
    this.loading = this.loadingCtrl.create({
      content: 'now loading',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}
