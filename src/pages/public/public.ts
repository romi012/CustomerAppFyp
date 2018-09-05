import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {EventProvider} from "../../providers/event/event";

/**
 * Generated class for the PublicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-public',
  templateUrl: 'public.html',
})
export class PublicPage {
  public eventList: Array<any>;

  constructor(public navCtrl: NavController,     public eventProvider: EventProvider
  ) {
  }

  ionViewDidLoad() {
    this.eventProvider.getCompList()
      .orderByChild('time').on('value', eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach(snap => {
        this.eventList.push({
          id: snap.key,
          email:snap.val().email,
          name: snap.val().name,
          date: snap.val().date
        });
        return false;
      });
    });
  }

}
