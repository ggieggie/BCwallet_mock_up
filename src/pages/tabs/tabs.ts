import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TopPage } from '../top/top';
import { SendPage } from '../send/send';
import { TransactionPage } from '../transaction/transaction';
import { LogPage } from '../log/log';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TopPage;
  tab2Root = SendPage;
  tab3Root = TransactionPage;
  tab4Root = LogPage;

  constructor(public navCtrl: NavController) {
  }

}
