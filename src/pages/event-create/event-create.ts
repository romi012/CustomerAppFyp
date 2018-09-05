import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController,NavParams} from 'ionic-angular';
import {EventProvider, Post} from '../../providers/event/event';
import {SMS} from "@ionic-native/sms";

@IonicPage()
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html'
})
export class EventCreatePage {

  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider,private toastCtrl: ToastController,public sms: SMS,public navParams: NavParams
  ) {
   // this.emaill = navParams.get('data');
  }
  text :Post= {
    ComplaintName:'' ,
    PhoneNumber: '',
    eventDate:"",

  };


  createEvent(text:Post): void {
    this.eventProvider
      .createEvent(text)
      .then(newEvent => {
        this.navCtrl.pop();
      });
  }
  createComp(text:Post,email): void {
    this.eventProvider.createComp(text);}




  sendTextMessage(text:Post):void {
    //SMS.send('416123456', 'Hello world!');
    this.sms.send('03353305880', this.text.ComplaintName).then((result) => {
      let successToast = this.toastCtrl.create({
        message: "Text message sent successfully",
        duration: 3000
      })
      successToast.present();
    }, (error) => {
      let errorToast = this.toastCtrl.create({
        message: "Text message not sent. :(",
        duration: 3000
      })
      errorToast.present();
    });
  }
}
