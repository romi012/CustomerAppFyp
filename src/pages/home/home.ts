import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {EventCreatePage} from "../event-create/event-create";
import {EventListPage} from "../event-list/event-list";
import {AngularFireAuth} from "angularfire2/auth";
import {PublicPage} from "../public/public";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireAuth]
})
export class HomePage {
 // emaill:string;
  constructor(public navCtrl: NavController,public navParams: NavParams) {
   // this.emaill = navParams.get('data');
    //this.navCtrl.push(EventCreatePage, {
      //data: this.emaill
   // });
  }


  goToProfile(): void {
    this.navCtrl.push(ProfilePage);
  }

  goToCreate(): void {
    this.navCtrl.push(EventCreatePage);
  }

  goToList(): void {
    this.navCtrl.push(EventListPage);
  }
  goToPublic():void{
    this.navCtrl.push(PublicPage);
  }
}
