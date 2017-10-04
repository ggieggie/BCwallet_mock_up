import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Clipboard } from '@ionic-native/clipboard';
import { AlertController, NavController  } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-send',
  templateUrl: 'send.html'
})
export class SendPage {
  myAddress = "";
  myQr = null;
  yourAddress = null;
  testRadioOpen: boolean;
  testRadioResult;
  send_amount = 0;


　//コンストラクタ
  constructor(private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController,
     public navCtrl: NavController, public http: Http
     , private clipboard: Clipboard
    ) {

      this.getProfile();

  }

  //QRコードの作成
  createCode() {
    this.myQr = !this.myQr;
  }

  //QRコードの読み取り
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.yourAddress = barcodeData.text;
      if(barcodeData.text != ""){
      this.showPrompt();      
      }
    }, (err) => {
        console.log('Error: ', err);
    });
  }

  //送金プロンプトの表示
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'このアドレスに送金',
      message: "送金する金額を入力してください",
      inputs: [
        {
          name: 'input_amount',
          type: 'number',
          placeholder: '金額'
        },
      ],
      buttons: [
        {
          text: 'キャンセル',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '送金',
          handler: data => {
            this.send_amount = data.input_amount;
            console.log('qty: '+this.send_amount);
            console.log('myAdd: '+this.myAddress);
            console.log('yourAdd: '+this.yourAddress);            
            this.alert();
            console.log('Saved clicked');
            }
          }
        ]
      });
      prompt.present();
  }

  //マルコインの送信
  send_marucoin(){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json' );
        headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
        var options = new RequestOptions({ "headers": headers });
        var body = {
         "method"  : "sendfromaddress",
         "params"  : [this.myAddress, this.yourAddress, {"marucoin":Number(this.send_amount)}],
         "id"    : 0,
         "chain_name": "chain1"
        }
        this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
          .map(response => response.json())
          .subscribe(result => {
            console.log("data: "+JSON.stringify(result));
            this.yourAddress = null;
           }, error => {
            console.log(error);// Error getting the data
            this.yourAddress = null;
          });
  }


//送信相手リストの表示
showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('宛先を選択');

         alert.addInput({
           type: 'radio',
           label: '野村　武',
           value: ""
         });

         alert.addInput({
           type: 'radio',
           label: '内田　忠',
           value: ""
         });

         alert.addInput({
           type: 'radio',
           label: '栗林　修',
           value: ""
         });

         alert.addInput({
           type: 'radio',
           label: '島田　岳雄',
           value: ""
         });

         alert.addInput({
           type: 'radio',
           label: '戸本　裕太郎',
           value: "1XhgukBiUELDAMuNiKoefktkgC6NNYVuLTuFqJ"
         });

         alert.addInput({
           type: 'radio',
           label: '清田　雄平',
           value: "1DzhEqzER8vsja3s25TGsBSuAWuqUaXwk66s3A"
         });

     alert.addButton('キャンセル');
     alert.addButton({
       text: 'OK',
       handler: data => {
         this.testRadioOpen = false;
         console.log("data: "+data);
         this.yourAddress = data;
         this.showPrompt();
       }
     });
     alert.present();
    }

  //QRコードから相手と繋がって中電コインを送る
  scanCode_main() {
    this.scanCode();
  }

  //送信リストから相手を選んで中電コインを送る
  selectCode_main() {
    this.showRadio();
    //this.navCtrl.setRoot(MemberlistPage);
  }

  //情報取得
  public getProfile() {
    var user = firebase.auth().currentUser;
    this.myAddress = user.photoURL;
  }

  //copy
  public copy(){
    this.clipboard.copy(this.myAddress);
    let alert = this.alertCtrl.create({
      title: 'clipboard',
      subTitle: 'コピーしました',
      buttons: ['OK']
      });
    alert.present();
  }

  directCode(){
    let prompt = this.alertCtrl.create({
      title: 'このアドレスに送金',
      message: "入力してください",
      inputs: [
        {
          name: 'yourAddress',
          type: 'text',
          placeholder: 'アドレス'
        },
        {
          name: 'input_amount',
          type: 'number',
          placeholder: '金額'
        },
      ],
      buttons: [
        {
          text: 'キャンセル',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '送金',
          handler: data => {
            this.yourAddress = data.yourAddress;
            this.send_amount = data.input_amount;
            console.log('qty: '+this.send_amount);
            console.log('myAdd: '+this.myAddress);
            console.log('yourAdd: '+this.yourAddress);            
            this.alert();
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();

  }

  alert(){
  let prompt2 = this.alertCtrl.create({
    title: '確認',
    message: "送金しますか？",
    buttons: [
      {
        text: 'キャンセル',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '送金',
        handler: data => {
          console.log('qty: '+this.send_amount);
          console.log('myAdd: '+this.myAddress);
          console.log('yourAdd: '+this.yourAddress);
          if(this.myAddress == this.yourAddress){

            let alert = this.alertCtrl.create({
              title: 'error',
              subTitle: '自分には送信できません',
              buttons: ['OK']
              });
            alert.present();

          }else{
          this.send_marucoin();
          console.log('Saved clicked');
          }
        }
      }
    ]
    });
    prompt2.present();
  }

}
