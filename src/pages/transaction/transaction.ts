import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
})
export class TransactionPage {

  block = null;
  assets = "";
  totalBalance = null;
  loading: Loading;

  //dummy
  block2 = null;
  assets2 = "";
  totalBalance2 = null;

  constructor(public navCtrl: NavController, public http: Http,
   private loadingCtrl: LoadingController) {}

  get() {
    this.getBlock();
    this.getAssets();
    this.getDummy();
  }

  //ブロック数確認
  getBlock() {
    this.showLoading();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
    var options = new RequestOptions({ "headers": headers });
    var body = {
      method  : "getinfo",
      params  : [],
      id    : 0,
      chain_name: "chain1"
    }
    this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
      .map(response => response.json())
      .subscribe(result => {
        //console.log("data: "+JSON.stringify(result));
        if(JSON.stringify(result.result) == "null" || JSON.stringify(result.result) == "[]"){
          console.log("no balance");
          this.block = "error";
        }else{
        console.log("info: "+JSON.stringify(result.result));
        this.block = JSON.stringify(result.result.blocks);
        }
        this.loading.dismiss();
        }, error => {
        console.log(error);// Error getting the data
        this.loading.dismiss();
      });
  }

  //assets確認
  getAssets() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
    var options = new RequestOptions({ "headers": headers });
    var body = {
      method  : "listassets",
      params  : [],
      id    : 0,
      chain_name: "chain1"
    }
    this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
      .map(response => response.json())
      .subscribe(result => {
        //console.log("data: "+JSON.stringify(result));
        if(JSON.stringify(result.result) == "null" || JSON.stringify(result.result) == "[]"){
          console.log("no balance");
          this.assets = "error";
        }else{
        console.log("info: "+JSON.stringify(result.result[0].name));
        //marucoin => tomacoin
        //this.assets = JSON.stringify(result.result[0].name).substr(1,8);
        this.assets = "tomacoin";
        this.totalBalance= JSON.stringify(result.result[0].issueqty)
        }
        }, error => {
        console.log(error);// Error getting the data
      });
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

  //dummy
  getDummy(){
    this.block2 = 615;
    this.totalBalance2 = 100;
    this.assets2 = "cafenecoin";
  }

}
