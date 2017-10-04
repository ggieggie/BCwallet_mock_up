import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { TopPage } from '../pages/top/top';
import { SendPage } from '../pages/send/send';
import { TransactionPage } from '../pages/transaction/transaction';
import { LogPage } from '../pages/log/log';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { CreatePage } from '../pages/create/create';
import { CreatePageModule } from '../pages/create/create.module';

import { AccountPage } from '../pages/account/account';
import { SupportPage } from '../pages/support/support';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Clipboard } from '@ionic-native/clipboard';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { Firebase } from '@ionic-native/firebase';


export const firebaseConfig = {
  apiKey: "AIzaSyBj1l9IqIg-3OlgpS1wnS5xXcbYE4cdDmc",
  authDomain: "marucoin-9b.firebaseapp.com",
  databaseURL: "https://marucoin-9b.firebaseio.com",
  projectId: "marucoin-9b",
  storageBucket: "marucoin-9b.appspot.com",
  messagingSenderId: "482806641126"
};

@NgModule({
  declarations: [
    MyApp,

    TopPage,
    SendPage,
    TransactionPage,
    LogPage,
    TabsPage,

    AccountPage,
    SupportPage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    HttpModule,    
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,{
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }),
    LoginPageModule,
    CreatePageModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    TopPage,
    SendPage,
    TransactionPage,
    LogPage,
    TabsPage,
    
    LoginPage,
    CreatePage,

    AccountPage,
    SupportPage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Firebase,
    BarcodeScanner,
    Clipboard
  ]
})
export class AppModule {}
