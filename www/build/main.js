webpackJsonp([1],{

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_barcode_scanner__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_clipboard__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SendPage = (function () {
    //コンストラクタ
    function SendPage(barcodeScanner, alertCtrl, navCtrl, http, clipboard) {
        this.barcodeScanner = barcodeScanner;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.http = http;
        this.clipboard = clipboard;
        this.myAddress = "";
        this.myQr = null;
        this.yourAddress = null;
        this.send_amount = 0;
        this.getProfile();
    }
    //QRコードの作成
    SendPage.prototype.createCode = function () {
        this.myQr = !this.myQr;
    };
    //QRコードの読み取り
    SendPage.prototype.scanCode = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            _this.yourAddress = barcodeData.text;
            if (barcodeData.text != "") {
                _this.showPrompt();
            }
        }, function (err) {
            console.log('Error: ', err);
        });
    };
    //送金プロンプトの表示
    SendPage.prototype.showPrompt = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '送金',
                    handler: function (data) {
                        _this.send_amount = data.input_amount;
                        console.log('qty: ' + _this.send_amount);
                        console.log('myAdd: ' + _this.myAddress);
                        console.log('yourAdd: ' + _this.yourAddress);
                        _this.alert();
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    //マルコインの送信
    SendPage.prototype.send_marucoin = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
        var options = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */]({ "headers": headers });
        var body = {
            "method": "sendfromaddress",
            "params": [this.myAddress, this.yourAddress, { "marucoin": Number(this.send_amount) }],
            "id": 0,
            "chain_name": "chain1"
        };
        this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            console.log("data: " + JSON.stringify(result));
            _this.yourAddress = null;
        }, function (error) {
            console.log(error); // Error getting the data
            _this.yourAddress = null;
        });
    };
    //送信相手リストの表示
    SendPage.prototype.showRadio = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
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
            handler: function (data) {
                _this.testRadioOpen = false;
                console.log("data: " + data);
                _this.yourAddress = data;
                _this.showPrompt();
            }
        });
        alert.present();
    };
    //QRコードから相手と繋がって中電コインを送る
    SendPage.prototype.scanCode_main = function () {
        this.scanCode();
    };
    //送信リストから相手を選んで中電コインを送る
    SendPage.prototype.selectCode_main = function () {
        this.showRadio();
        //this.navCtrl.setRoot(MemberlistPage);
    };
    //情報取得
    SendPage.prototype.getProfile = function () {
        var user = firebase.auth().currentUser;
        this.myAddress = user.photoURL;
    };
    //copy
    SendPage.prototype.copy = function () {
        this.clipboard.copy(this.myAddress);
        var alert = this.alertCtrl.create({
            title: 'clipboard',
            subTitle: 'コピーしました',
            buttons: ['OK']
        });
        alert.present();
    };
    SendPage.prototype.directCode = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '送金',
                    handler: function (data) {
                        _this.yourAddress = data.yourAddress;
                        _this.send_amount = data.input_amount;
                        console.log('qty: ' + _this.send_amount);
                        console.log('myAdd: ' + _this.myAddress);
                        console.log('yourAdd: ' + _this.yourAddress);
                        _this.alert();
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    SendPage.prototype.alert = function () {
        var _this = this;
        var prompt2 = this.alertCtrl.create({
            title: '確認',
            message: "送金しますか？",
            buttons: [
                {
                    text: 'キャンセル',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '送金',
                    handler: function (data) {
                        console.log('qty: ' + _this.send_amount);
                        console.log('myAdd: ' + _this.myAddress);
                        console.log('yourAdd: ' + _this.yourAddress);
                        if (_this.myAddress == _this.yourAddress) {
                            var alert_1 = _this.alertCtrl.create({
                                title: 'error',
                                subTitle: '自分には送信できません',
                                buttons: ['OK']
                            });
                            alert_1.present();
                        }
                        else {
                            _this.send_marucoin();
                            console.log('Saved clicked');
                        }
                    }
                }
            ]
        });
        prompt2.present();
    };
    return SendPage;
}());
SendPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-send',template:/*ion-inline-start:"/Users/sumiden/dev/prod4/src/pages/send/send.html"*/'<ion-header>\n  <ion-navbar color="custom-color">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      受送金\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="send-content" padding>\n  <div id="page3-markdown3" style="text-align:center;" class="show-list-numbers-and-dots">\n    <p>\n      アドレス（QRコード）で仮想通貨を受送金できます。\n    </p>\n  </div>\n  <div id="page3-markdown6" style="text-align:center;" class="show-list-numbers-and-dots">\n    <!--\n     <ion-item>\n      //今はここに打ち込みテストしていますが、URLは内部でゲットしてくるようにします\n        <ion-input type="text" placeholder="MY QR Code data" [(ngModel)]="qrData">\n        </ion-input>\n     </ion-item>\n    -->\n    <button ion-button class="submit-btn" full icon-left (click)="createCode()"><ion-icon name="apps"></ion-icon>自分のアドレスを表示</button>\n\n    <ion-card *ngIf="myQr">\n      <ngx-qrcode [qrc-value]="myAddress"></ngx-qrcode>\n      <ion-card-content>\n        <p>あなたのアドレス: {{ myAddress }}</p>\n        <button ion-button  icon-left (click)="copy()"><ion-icon name="clipboard"></ion-icon>copy</button>\n      </ion-card-content>\n    </ion-card>\n\n    <button ion-button class="submit-btn" full icon-left (click)="scanCode_main()" color="secondary"><ion-icon name="qr-scanner"></ion-icon>QRコードをスキャンして送金</button>\n    <button ion-button class="submit-btn" full icon-left (click)="selectCode_main()" color="secondary"><ion-icon name="albums"></ion-icon>宛先を選択して送金</button>\n    <button ion-button class="submit-btn" full icon-left (click)="directCode()" color="secondary"><ion-icon name="create"></ion-icon>直接アドレスを入力して送金</button>\n\n    <!--\n    <ion-card *ngIf="yourAddress">\n      <ion-card-content>\n        Scanned: {{ yourAddress }}\n      </ion-card-content>\n    </ion-card>\n    -->\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/sumiden/dev/prod4/src/pages/send/send.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_clipboard__["a" /* Clipboard */]])
], SendPage);

//# sourceMappingURL=send.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the TopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TopPage = (function () {
    function TopPage(navCtrl, http, angularFire, modalCtrl, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.angularFire = angularFire;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        //インスタンス
        this.username = '';
        this.email = '';
        this.cafene_balance = null;
        this.maru_balance = null;
        this.coinAddress = '';
        console.log("topPage constructor");
        //認証
        angularFire.auth.subscribe(function (state) {
            _this.authState = state;
            console.log("check state");
            if (_this.authState != null) {
                // 認証情報がnullでない場合（認証できている場合） 
                console.log('already logined');
                if (_this.maru_balance == null) {
                    _this.getProfile();
                    _this.getCafenebalance();
                    _this.getMarubalance();
                }
            }
            else {
                // 認証情報がnullの場合（認証できていない場合） ログインページへ
                console.log('to loginPage');
                var loginModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */], {}, { "enableBackdropDismiss": false });
                loginModal.present();
            }
        });
    }
    //topのreloadボタン用関数
    TopPage.prototype.reload = function () {
        this.getProfile();
        this.getCafenebalance();
        this.reloadGetMarubalance();
    };
    //ビットコインの値を確認する関数
    TopPage.prototype.getCafenebalance = function () {
        this.cafene_balance = 100;
    };
    //マルコインの値を確認する関数
    TopPage.prototype.getMarubalance = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ "headers": headers });
        var body = {
            method: "getaddressbalances",
            params: [this.coinAddress],
            id: 0,
            chain_name: "chain1"
        };
        this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            //console.log("data: "+JSON.stringify(result));
            if (JSON.stringify(result.result) == "null" || JSON.stringify(result.result) == "[]") {
                console.log("no balance");
                _this.maru_balance = 0;
            }
            else {
                console.log("qty: " + JSON.stringify(result.result[0].qty));
                _this.maru_balance = JSON.stringify(result.result[0].qty);
            }
        }, function (error) {
            console.log(error); // Error getting the data
        });
    };
    //reload&マルコインの値を確認する関数
    TopPage.prototype.reloadGetMarubalance = function () {
        var _this = this;
        this.showLoading();
        this.maru_balance = null;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ "headers": headers });
        var body = {
            method: "getaddressbalances",
            params: [this.coinAddress],
            id: 0,
            chain_name: "chain1"
        };
        this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            console.log("data: " + JSON.stringify(result));
            if (JSON.stringify(result.result) == "null" || JSON.stringify(result.result) == "[]") {
                console.log("no balance");
                console.log(result);
                _this.maru_balance = 0;
            }
            else {
                console.log("name: " + JSON.stringify(result.result[0].name));
                console.log("qty: " + JSON.stringify(result.result[0].qty));
                _this.maru_balance = JSON.stringify(result.result[0].qty);
            }
            _this.loading.dismiss();
        }, function (error) {
            console.log(error); // Error getting the data
            _this.loading.dismiss();
        });
    };
    //ログアウト
    TopPage.prototype.logout = function () {
        this.username = '';
        this.email = '';
        this.cafene_balance = null;
        this.maru_balance = null;
        this.coinAddress = '';
        console.log("logout");
        this.angularFire.auth.logout();
    };
    //情報取得
    TopPage.prototype.getProfile = function () {
        var user = firebase.auth().currentUser;
        this.username = user.displayName;
        this.coinAddress = user.photoURL;
    };
    //ローディング表示
    TopPage.prototype.showLoading = function () {
        if (this.loading) {
            this.loading.dismiss();
        }
        this.loading = this.loadingCtrl.create({
            content: 'now loading',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    return TopPage;
}());
TopPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-top',template:/*ion-inline-start:"/Users/sumiden/dev/prod4/src/pages/top/top.html"*/'\n<ion-header>\n  <ion-navbar color="custom-color">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      トップ\n    </ion-title>\n      <ion-buttons end>\n        <button ion-button (click)="logout()" >ログアウト︎</button>\n      </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="top-content" padding>\n  <p>{{ username }}さんが所持している仮想通貨</p>\n  <ion-list >\n\n    <ion-item color="none" id="page2-list-item7">\n        <ion-avatar item-left>\n          <img src="assets/img/cafenecoin.png" />\n        </ion-avatar>\n        <h2>カフェネコイン</h2>\n        <p clear item-end>{{ maru_balance | number }} TMC</p>\n      </ion-item>\n\n    <ion-item color="none" >\n      <ion-avatar item-left>\n        <img src="assets/img/tomacoin.png" />\n      </ion-avatar>\n      <h2>トマコイン</h2>\n      <p clear item-end>{{ cafene_balance | number }} CFC</p>\n    </ion-item>\n\n  </ion-list>\n  <div id="page3-markdown6" style="text-align:center;" class="show-list-numbers-and-dots">\n  </div>\n  <button ion-button class="submit-btn" full icon-left (click) = "reload()"><ion-icon name="refresh"></ion-icon>reload</button>\n</ion-content>\n'/*ion-inline-end:"/Users/sumiden/dev/prod4/src/pages/top/top.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFire */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFire */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */]])
], TopPage);

//# sourceMappingURL=top.js.map

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 129;

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/create/create.module": [
		172
	],
	"../pages/login/login.module": [
		180
	],
	"../pages/top/top.module": [
		337,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 171;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatePageModule", function() { return CreatePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CreatePageModule = (function () {
    function CreatePageModule() {
    }
    return CreatePageModule;
}());
CreatePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__create__["a" /* CreatePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__create__["a" /* CreatePage */]),
        ],
    })
], CreatePageModule);

//# sourceMappingURL=create.module.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    return LoginPageModule;
}());
LoginPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
        ],
    })
], LoginPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__top_top__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__send_send__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__transaction_transaction__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__log_log__ = __webpack_require__(226);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = (function () {
    function TabsPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__top_top__["a" /* TopPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__send_send__["a" /* SendPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__transaction_transaction__["a" /* TransactionPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_5__log_log__["a" /* LogPage */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/sumiden/dev/prod4/src/pages/tabs/tabs.html"*/'<ion-tabs color = "custom-color">\n  <ion-tab [root]="tab1Root" tabTitle="トップ" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="受送金" tabIcon="cash"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="block情報" tabIcon="md-information-circle"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="履歴" tabIcon="refresh"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/sumiden/dev/prod4/src/pages/tabs/tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TransactionPage = (function () {
    function TransactionPage(navCtrl, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.block = null;
        this.assets = "";
        this.totalBalance = null;
        //dummy
        this.block2 = null;
        this.assets2 = "";
        this.totalBalance2 = null;
    }
    TransactionPage.prototype.get = function () {
        this.getBlock();
        this.getAssets();
        this.getDummy();
    };
    //ブロック数確認
    TransactionPage.prototype.getBlock = function () {
        var _this = this;
        this.showLoading();
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ "headers": headers });
        var body = {
            method: "getinfo",
            params: [],
            id: 0,
            chain_name: "chain1"
        };
        this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            //console.log("data: "+JSON.stringify(result));
            if (JSON.stringify(result.result) == "null" || JSON.stringify(result.result) == "[]") {
                console.log("no balance");
                _this.block = "error";
            }
            else {
                console.log("info: " + JSON.stringify(result.result));
                _this.block = JSON.stringify(result.result.blocks);
            }
            _this.loading.dismiss();
        }, function (error) {
            console.log(error); // Error getting the data
            _this.loading.dismiss();
        });
    };
    //assets確認
    TransactionPage.prototype.getAssets = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ "headers": headers });
        var body = {
            method: "listassets",
            params: [],
            id: 0,
            chain_name: "chain1"
        };
        this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            //console.log("data: "+JSON.stringify(result));
            if (JSON.stringify(result.result) == "null" || JSON.stringify(result.result) == "[]") {
                console.log("no balance");
                _this.assets = "error";
            }
            else {
                console.log("info: " + JSON.stringify(result.result[0].name));
                //marucoin => tomacoin
                //this.assets = JSON.stringify(result.result[0].name).substr(1,8);
                _this.assets = "tomacoin";
                _this.totalBalance = JSON.stringify(result.result[0].issueqty);
            }
        }, function (error) {
            console.log(error); // Error getting the data
        });
    };
    //ローディング表示
    TransactionPage.prototype.showLoading = function () {
        if (this.loading) {
            this.loading.dismiss();
        }
        this.loading = this.loadingCtrl.create({
            content: 'now loading',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    //dummy
    TransactionPage.prototype.getDummy = function () {
        this.block2 = 615;
        this.totalBalance2 = 100;
        this.assets2 = "cafenecoin";
    };
    return TransactionPage;
}());
TransactionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-transaction',template:/*ion-inline-start:"/Users/sumiden/dev/prod4/src/pages/transaction/transaction.html"*/'<ion-header>\n  <ion-navbar color="custom-color">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      仮想通貨の内部情報\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<!--\n  カフェネコインとトマコインを入れ替えた関係で\n  アセット名と他2つの情報がちぐはぐになっている\n-->\n<ion-content class="transaction-content" padding>\n  <h1 id="page4-heading2" style="color:#000000;text-align:center;">\n    MultiChain Information\n  </h1>\n    <ion-list>\n        <ion-item>\n          <div id="page4-markdown13" class="show-list-numbers-and-dots">\n            <h5 style="color:#000000;">\n              Assets: {{assets2}}\n            </h5>\n          </div>\n  <div id="page4-markdown12" class="show-list-numbers-and-dots">\n    <h5 style="color:#000000;">\n      Block: {{block | number}}\n    </h5>\n  </div>\n  <div id="page4-markdown14" class="show-list-numbers-and-dots">\n    <h5 style="color:#000000;">\n      TotalBalance: {{totalBalance | number}}\n    </h5>\n  </div>\n</ion-item>\n<ion-item>\n  <div id="page4-markdown13" class="show-list-numbers-and-dots">\n    <h5 style="color:#000000;">\n      Assets: {{assets}}\n    </h5>\n  </div>\n  <div id="page4-markdown12" class="show-list-numbers-and-dots">\n    <h5 style="color:#000000;">\n      Block: {{block2 | number}}\n    </h5>\n  </div>\n  <div id="page4-markdown14" class="show-list-numbers-and-dots">\n    <h5 style="color:#000000;">\n      TotalBalance: {{totalBalance2 | number}}\n    </h5>\n  </div>\n</ion-item>\n</ion-list>\n  <button ion-button class="submit-btn" full icon-left (click) = "get()"><ion-icon name="md-information-circle"></ion-icon>get</button>\n</ion-content>\n'/*ion-inline-end:"/Users/sumiden/dev/prod4/src/pages/transaction/transaction.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], TransactionPage);

//# sourceMappingURL=transaction.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__send_send__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LogPage = (function () {
    function LogPage(navCtrl, loadingCtrl, http) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.logs = [];
        this.myAddress = "";
        this.transaction = "";
    }
    LogPage.prototype.get = function () {
        this.getProfile();
        this.listTransactions();
    };
    //履歴確認
    LogPage.prototype.listTransactions = function () {
        var _this = this;
        this.showLoading();
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ "headers": headers });
        var body = {
            "method": "listaddresstransactions",
            "params": [this.myAddress],
            "id": 0,
            "chain_name": "chain1"
        };
        this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            //console.log("transactions: "+JSON.stringify(result));
            //console.log("transactions: "+JSON.stringify(result.result[1]));
            if (!JSON.stringify(result.result[1])) {
                console.log("no log");
            }
            else {
                console.log("transactions: " + JSON.stringify(result.result[1].balance.assets[0].qty));
                console.log("transactions: " + JSON.stringify(result.result[1].addresses[0]));
                console.log("transactions: " + JSON.stringify(result.result));
                var temp = result.result.splice(0, 1);
                _this.logs = result.result;
            }
            _this.loading.dismiss();
        }, function (error) {
            console.log(error),
                _this.loading.dismiss();
        });
    };
    //情報取得
    LogPage.prototype.getProfile = function () {
        var user = firebase.auth().currentUser;
        this.myAddress = user.photoURL;
    };
    LogPage.prototype.returntabs = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__send_send__["a" /* SendPage */]);
    };
    //ローディング表示
    LogPage.prototype.showLoading = function () {
        if (this.loading) {
            this.loading.dismiss();
        }
        this.loading = this.loadingCtrl.create({
            content: 'now loading',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    return LogPage;
}());
LogPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-log',template:/*ion-inline-start:"/Users/sumiden/dev/prod4/src/pages/log/log.html"*/'<ion-header>\n  <ion-navbar color="custom-color">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      取引履歴\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="log-content" padding>\n    <button ion-button class="submit-btn" full icon-left (click) = "get()"><ion-icon name="md-information-circle"></ion-icon>get（最新10件）</button>\n    <ion-list>\n    <ion-item *ngFor="let log of logs.reverse()">\n\n      <!-- アイコン検索 -->\n      <!-- master -->\n      <ion-avatar item-left *ngIf="log.addresses[0] == \'1Zz3rAJ5mBTQepG5uJbkuvF79f3FaKvmyR7f3r\'">\n        <img src="assets/img/master.jpg">\n      </ion-avatar>\n\n      <!-- kiyota -->\n      <ion-avatar item-left *ngIf="log.addresses[0] == \'1DzhEqzER8vsja3s25TGsBSuAWuqUaXwk66s3A\'">\n          <img src="assets/img/k.jpg">\n        </ion-avatar>\n\n      <!-- tomoto -->\n      <ion-avatar item-left *ngIf="log.addresses[0] == \'1XhgukBiUELDAMuNiKoefktkgC6NNYVuLTuFqJ\'">\n          <img src="assets/img/t.jpg">\n        </ion-avatar>\n\n      <h2>address : {{ log.addresses[0] }}</h2>\n      <h2 *ngIf="log.balance.assets[0].qty > 0">受信 : {{ log.balance.assets[0].qty }} MRC</h2>\n      <h2 *ngIf="log.balance.assets[0].qty < 0">送金 : {{ log.balance.assets[0].qty * -1 }} MRC</h2>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/sumiden/dev/prod4/src/pages/log/log.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
], LogPage);

//# sourceMappingURL=log.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AccountPage = (function () {
    function AccountPage(alertCtrl, navCtrl, viewCtrl) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        //インスタンス
        this.username = '';
        this.email = '';
        this.iconId = '';
        this.getProfile();
    }
    //サイドバーを閉じる
    AccountPage.prototype.returntabs = function () {
        this.viewCtrl.dismiss();
    };
    //情報取得
    AccountPage.prototype.getProfile = function () {
        var user = firebase.auth().currentUser;
        this.username = user.displayName;
        this.email = user.email;
        if (this.username.charAt(0).match(/[A-Za-z]/)) {
            this.iconId = this.username.charAt(0) + ".jpg";
        }
        else {
            this.iconId = "none.png";
        }
    };
    return AccountPage;
}());
AccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-account',template:/*ion-inline-start:"/Users/sumiden/dev/prod4/src/pages/account/account.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      アカウント情報\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="returntabs()" color="primary">戻る︎</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="outer-content">\n  <div padding-top text-center *ngIf="username">\n    <img src="assets/img/{{iconId}}" alt="avatar">\n    <h2>{{username}}</h2>\n    <h2>{{email}}</h2>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/sumiden/dev/prod4/src/pages/account/account.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */]])
], AccountPage);

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SupportPage = (function () {
    function SupportPage(navCtrl, alertCtrl, toastCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.submitted = false;
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
    SupportPage.prototype.submit = function (form) {
        this.submitted = true;
        if (form.valid) {
            this.supportMessage = 'test';
            this.submitted = false;
            var toast = this.toastCtrl.create({
                message: 'Your support request has been sent.',
                duration: 3000
            });
            toast.present();
        }
    };
    SupportPage.prototype.returntabs = function () {
        this.viewCtrl.dismiss();
    };
    return SupportPage;
}());
SupportPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user',template:/*ion-inline-start:"/Users/sumiden/dev/prod4/src/pages/support/support.html"*/'<ion-header>\n\n    <ion-navbar>\n      <ion-title>各種お問い合わせ</ion-title>\n      <ion-buttons end>\n        <button ion-button (click)="returntabs()" color="primary">戻る︎</button>\n      </ion-buttons>\n    </ion-navbar>\n\n  </ion-header>\n\n\n  <ion-content>\n    <div class="logo">\n      <img src="assets/img/tomato_30_1.png" alt="Ionic Logo">\n    </div>\n\n    <form #submitForm="ngForm" novalidate (ngSubmit)="submit(submitForm)">\n      <ion-list no-lines>\n        <ion-item>\n          <ion-label stacked color="primary">お問い合わせ内容を記載し送信ボタンを押してください。</ion-label>\n          <ion-textarea [(ngModel)]="supportMessage" name="supportQuestion" #supportQuestion="ngModel" rows="6" required></ion-textarea>\n        </ion-item>\n      </ion-list>\n\n      <p ion-text [hidden]="supportQuestion.valid || submitted === false" color="danger" padding-left>\n        Support message is required\n      </p>\n\n      <div padding>\n        <button ion-button block type="submit">送信</button>\n      </div>\n    </form>\n  </ion-content>\n'/*ion-inline-end:"/Users/sumiden/dev/prod4/src/pages/support/support.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */]])
], SupportPage);

//# sourceMappingURL=support.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(248);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_top_top__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_send_send__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_transaction_transaction__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_log_log__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login_module__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_create_create__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_create_create_module__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_account_account__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_support_support__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_tutorial_tutorial__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_barcode_scanner__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ngx_qrcode2__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_clipboard__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_angularfire2__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_firebase__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























var firebaseConfig = {
    apiKey: "AIzaSyBj1l9IqIg-3OlgpS1wnS5xXcbYE4cdDmc",
    authDomain: "marucoin-9b.firebaseapp.com",
    databaseURL: "https://marucoin-9b.firebaseio.com",
    projectId: "marucoin-9b",
    storageBucket: "marucoin-9b.appspot.com",
    messagingSenderId: "482806641126"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_top_top__["a" /* TopPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_send_send__["a" /* SendPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_transaction_transaction__["a" /* TransactionPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_log_log__["a" /* LogPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_support_support__["a" /* SupportPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_tutorial_tutorial__["a" /* TutorialPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/create/create.module#CreatePageModule', name: 'CreatePage', segment: 'create', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/top/top.module#TopPageModule', name: 'TopPage', segment: 'top', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_22_angularfire2__["c" /* AngularFireModule */].initializeApp(firebaseConfig, {
                provider: __WEBPACK_IMPORTED_MODULE_22_angularfire2__["e" /* AuthProviders */].Password,
                method: __WEBPACK_IMPORTED_MODULE_22_angularfire2__["d" /* AuthMethods */].Password
            }),
            __WEBPACK_IMPORTED_MODULE_11__pages_login_login_module__["LoginPageModule"],
            __WEBPACK_IMPORTED_MODULE_13__pages_create_create_module__["CreatePageModule"],
            __WEBPACK_IMPORTED_MODULE_20_ngx_qrcode2__["a" /* NgxQRCodeModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_top_top__["a" /* TopPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_send_send__["a" /* SendPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_transaction_transaction__["a" /* TransactionPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_log_log__["a" /* LogPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_create_create__["a" /* CreatePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_support_support__["a" /* SupportPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_tutorial_tutorial__["a" /* TutorialPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_firebase__["a" /* Firebase */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_21__ionic_native_clipboard__["a" /* Clipboard */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_account_account__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_support_support__ = __webpack_require__(228);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import { TutorialPage } from '../pages/tutorial/tutorial';

var MyApp = (function () {
    function MyApp(platform, statusBar, toastCtrl, alertCtrl, modalCtrl) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__["a" /* TabsPage */];
        this.appPages = [
            { title: 'アカウント情報', name: 'AccountPage', component: __WEBPACK_IMPORTED_MODULE_4__pages_account_account__["a" /* AccountPage */], icon: 'person' },
            { title: '各種設定', name: 'SupportPage', component: __WEBPACK_IMPORTED_MODULE_5__pages_support_support__["a" /* SupportPage */], icon: 'information-circle' }
        ];
        this.platform = platform;
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                if (_this.alert) {
                    _this.alert.dismiss();
                    _this.alert = null;
                }
                else {
                    _this.showAlert();
                }
            });
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
        });
    }
    MyApp.prototype.showAlert = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Exit?',
            message: 'Do you want to exit the app?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        _this.alert = null;
                    }
                },
                {
                    text: 'Exit',
                    handler: function () {
                        _this.platform.exitApp();
                    }
                }
            ]
        });
        this.alert.present();
    };
    MyApp.prototype.showToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Press Again to exit',
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    MyApp.prototype.openPage = function (page) {
        var params = {};
        // the nav component was found using @ViewChild(Nav)
        // setRoot on the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            params = { tabIndex: page.index };
        }
        // If we are already on tabs just change the selected tab
        // don't setRoot again, this maintains the history stack of the
        // tabs even if changing them from the menu
        if (this.navCtrl.getActiveChildNavs().length && page.index != undefined) {
            this.navCtrl.getActiveChildNavs()[0].select(page.index);
            // Set the root of the nav with params if it's a tab index
        }
        else {
            this.navCtrl.setRoot(page.name, params).catch(function (err) {
                console.log("Didn't set nav root: " + err);
            });
        }
    };
    MyApp.prototype.openAccount = function () {
        var loginModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_account_account__["a" /* AccountPage */], {}, { "enableBackdropDismiss": false });
        loginModal.present();
    };
    MyApp.prototype.openSupport = function () {
        var loginModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_support_support__["a" /* SupportPage */], {}, { "enableBackdropDismiss": false });
        loginModal.present();
    };
    /*
     openTutorial() {
       let loginModal = this.modalCtrl.create(TutorialPage,{},{"enableBackdropDismiss":false});
       loginModal.present();  }
    */
    MyApp.prototype.isActive = function (page) {
        var childNav = this.navCtrl.getActiveChildNavs()[0];
        // Tabs are a special case because they have their own navigation
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
                return 'primary';
            }
            return;
        }
        if (this.navCtrl.getActive() && this.navCtrl.getActive().name === page.name) {
            return 'primary';
        }
        return;
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
], MyApp.prototype, "navCtrl", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/sumiden/dev/prod4/src/app/app.html"*/'<ion-menu [content]="mainContent">\n\n      <ion-header>\n        <ion-toolbar color="custom-color">\n            <button ion-button menuToggle>\n                <ion-icon name="menu"></ion-icon>\n              </button>\n          <ion-title>Menu</ion-title>\n        </ion-toolbar>\n      </ion-header>\n\n      <ion-content id="side-menu21">\n\n        <ion-list id="menu-list1">\n          <ion-list-header>\n            管理・設定\n          </ion-list-header>\n          <button ion-item menuClose (click)="openAccount()">\n            <ion-icon item-start name="person"></ion-icon>\n            アカウント\n          </button>\n          <button ion-item menuClose (click)="openSupport()">\n            <ion-icon item-start name="help"></ion-icon>\n            各種お問い合わせ\n          </button>\n        </ion-list>\n<!--\n        <ion-list>\n          <ion-list-header>\n            チュートリアル\n          </ion-list-header>\n          <button ion-item menuClose (click)="openTutorial()">\n            <ion-icon item-start name="hammer"></ion-icon>\n            チュートリアル\n          </button>\n        </ion-list>\n      -->\n\n      </ion-content>\n    </ion-menu>\n\n    <ion-nav #mainContent [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/sumiden/dev/prod4/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TutorialPage = (function () {
    function TutorialPage(navCtrl, menu, viewCtrl) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.viewCtrl = viewCtrl;
        this.showSkip = true;
    }
    TutorialPage.prototype.startApp = function () {
        this.viewCtrl.dismiss();
    };
    TutorialPage.prototype.onSlideChangeStart = function (slider) {
        this.showSkip = !slider.isEnd();
    };
    TutorialPage.prototype.ionViewWillEnter = function () {
        this.slides.update();
    };
    TutorialPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    };
    TutorialPage.prototype.ionViewDidLeave = function () {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    };
    return TutorialPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('slides'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Slides */])
], TutorialPage.prototype, "slides", void 0);
TutorialPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tutorial',template:/*ion-inline-start:"/Users/sumiden/dev/prod4/src/pages/tutorial/tutorial.html"*/'<ion-header no-border>\n  <ion-navbar>\n    <ion-buttons end *ngIf="showSkip">\n      <button ion-button (click)="startApp()" color="primary">スキップする</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n  <ion-slides #slides (ionSlideWillChange)="onSlideChangeStart($event)" pager>\n\n    <ion-slide>\n      <img src="assets/img/ica-slidebox-img-1.png" class="slide-image"/>\n      <h2 class="slide-title">\n        Welcome to <b>ICA</b>\n      </h2>\n      <p>\n        The <b>ionic conference app</b> is a practical preview of the ionic framework in action, and a demonstration of proper code use.\n      </p>\n    </ion-slide>\n\n    <ion-slide>\n      <img src="assets/img/ica-slidebox-img-2.png" class="slide-image"/>\n      <h2 class="slide-title" >What is Ionic?</h2>\n      <p><b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.</p>\n    </ion-slide>\n\n    <ion-slide>\n      <img src="assets/img/ica-slidebox-img-3.png" class="slide-image"/>\n      <h2 class="slide-title">What is Ionic Platform?</h2>\n      <p>The <b>Ionic Platform</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.</p>\n    </ion-slide>\n\n    <ion-slide>\n      <img src="assets/img/ica-slidebox-img-4.png" class="slide-image"/>\n      <h2 class="slide-title">Ready to Play?</h2>\n      <button ion-button icon-end large clear (click)="startApp()">\n        Continue\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n    </ion-slide>\n\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/Users/sumiden/dev/prod4/src/pages/tutorial/tutorial.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */]])
], TutorialPage);

//# sourceMappingURL=tutorial.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_create__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginPage = (function () {
    //コンストラクタ
    function LoginPage(alertCtrl, loadingCtrl, navParams, angularFire, viewCtrl, modalCtrl) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.angularFire = angularFire;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        console.log("loginPage constructor");
    }
    //アカウント作成
    LoginPage.prototype.createAccount = function () {
        console.log('to regiserPage');
        var loginModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__create_create__["a" /* CreatePage */], {}, { "enableBackdropDismiss": false });
        loginModal.present();
        this.viewCtrl.dismiss();
    };
    //ログイン処理
    LoginPage.prototype.login = function () {
        var _this = this;
        console.log('logining...');
        this.showLoading();
        this.angularFire.auth.login({
            email: this.email,
            password: this.password
        }).then(function (res) {
            console.log('logined');
            _this.viewCtrl.dismiss();
            _this.loading.dismiss();
        }).catch(function (err) {
            var alert = _this.alertCtrl.create({
                title: 'ログインエラー',
                subTitle: String(err),
                buttons: ['OK']
            });
            alert.present();
            _this.loading.dismiss();
            console.log(err);
        });
    };
    //ローディング表示
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'now loading',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/sumiden/dev/prod4/src/pages/login/login.html"*/'<ion-content class="login-content" padding>\n  <ion-row >\n    <ion-col>\n      <img src="assets/img/title.png" width="200">\n      <img src="assets/img/logo.png" width="200">\n      <div>ver.1.00</div>\n    </ion-col>\n  </ion-row>\n  <div class="login-box">\n    <form #registerForm="ngForm">\n      <ion-row>\n        <ion-col>\n          <ion-list>\n            <ion-item>\n              <ion-input type="email" placeholder="Email" name="email" [(ngModel)]="email" required></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="password" required></ion-input>\n            </ion-item>\n          </ion-list>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid" (click)="login()">ログイン</button>\n          <button ion-button class="register-btn" block clear (click)="createAccount()">アカウントを作成する</button>\n        </ion-col>\n      </ion-row>\n\n    </form>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/sumiden/dev/prod4/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFire */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_firebase__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CreatePage = (function () {
    //コンストラクタ
    function CreatePage(modalCtrl, alertCtrl, loadingCtrl, navParams, afauth, angularFire, viewCtrl, http) {
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.afauth = afauth;
        this.angularFire = angularFire;
        this.viewCtrl = viewCtrl;
        this.http = http;
        this.coinAddress = null;
        console.log('createPage constructor');
    }
    //登録処理
    CreatePage.prototype.createUser = function () {
        var _this = this;
        console.log('create user');
        this.showLoading();
        this.angularFire.auth.createUser({
            email: this.email,
            password: this.password
        }).then(function (_) {
            console.log('created user');
            _this.getNewAddress();
        }).catch(function (err) {
            var alert = _this.alertCtrl.create({
                title: 'エラー',
                subTitle: String(err),
                buttons: ['OK']
            });
            alert.present();
            _this.loading.dismiss();
        });
    };
    //コインアドレス生成関数
    CreatePage.prototype.getNewAddress = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ "headers": headers });
        var body = {
            method: "getnewaddress",
            params: [],
            id: 0,
            chain_name: "chain1"
        };
        this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            console.log("got new address: " + result.result);
            _this.coinAddress = result.result;
            _this.updateProfile();
            _this.grant();
        }, function (error) {
            console.log(error); // Error getting the data
        });
    };
    CreatePage.prototype.grant = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic bXVsdGljaGFpbnJwYzoyR2tXWjlnMjhYTDNBUHpXcGJVM0p4TmlYSHBSRWRmVTRmWTl1YXdYOWpoWg==');
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ "headers": headers });
        var body = {
            method: "grant",
            params: [this.coinAddress, "connect,send,receive,create"],
            id: 0,
            chain_name: "chain1"
        };
        this.http.post("https://yqqc8r7eeh.execute-api.us-west-2.amazonaws.com/prod/ab", body, options)
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            console.log("granted");
            _this.viewCtrl.dismiss();
            _this.loading.dismiss();
        }, function (error) {
            console.log(error); // Error getting the data
            _this.loading.dismiss();
        });
    };
    //プロフィール更新関数
    CreatePage.prototype.updateProfile = function () {
        console.log('displayName:' + this.displayName);
        console.log('coinAddress:' + this.coinAddress);
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: this.displayName,
            photoURL: this.coinAddress
        }).then(function (_) {
            console.log('updated profile');
        }).catch(function (err) {
            console.log(String(err));
        });
    };
    CreatePage.prototype.backLoginPage = function () {
        var loginModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */], {}, { "enableBackdropDismiss": false });
        loginModal.present();
        this.viewCtrl.dismiss();
    };
    //ローディング表示
    CreatePage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'now loading',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    return CreatePage;
}());
CreatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-create',template:/*ion-inline-start:"/Users/sumiden/dev/prod4/src/pages/create/create.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <ion-title>アカウント作成</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="login-content" padding>\n  <div class="login-box">\n    <form #registerForm="ngForm">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n\n            <ion-item>\n              <ion-input type="email" placeholder="Email" name="email" [(ngModel)]="email" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="password" required></ion-input>\n            </ion-item>\n            \n            <ion-item>\n              <ion-input type="email" placeholder="Name(半角英字)" name="displayName" [(ngModel)]="displayName" required></ion-input>\n            </ion-item>\n\n          </ion-list>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid" (click)="createUser()">作成してログイン</button>\n          <button ion-button class="register-btn" block clear (click)="backLoginPage()">ログインページへもどる</button>          \n        </ion-col>\n      </ion-row>\n\n    </form>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/sumiden/dev/prod4/src/pages/create/create.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4__ionic_native_firebase__["a" /* Firebase */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2__["b" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2__["a" /* AngularFire */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
], CreatePage);

//# sourceMappingURL=create.js.map

/***/ })

},[233]);
//# sourceMappingURL=main.js.map