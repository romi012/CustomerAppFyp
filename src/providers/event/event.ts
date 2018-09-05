import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {SMS} from "@ionic-native/sms";
import {ToastController} from "ionic-angular";
import { DatePipe } from '@angular/common';


export class Post {
  ComplaintName: string;
  eventDate: string;
  PhoneNumber:string;

}
@Injectable()
export class EventProvider {
public date;
  public eventListRef: firebase.database.Reference;
  public compRef: firebase.database.Reference
  text :Post= {
    ComplaintName:'' ,
    PhoneNumber: "",
    eventDate: ""
  };


  constructor(  private toastCtrl: ToastController,public sms: SMS,public datepipe: DatePipe) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {

        this.compRef = firebase.database().ref(`/complaints/eventList`);

        this.eventListRef = firebase.database().ref(`/userProfile/${user.uid}/eventList`);


      }
    });
  }

    // presentDate(){
    //
    //this.date=Date.now();
    //   this.latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    // }

  createEvent( text:Post): firebase.database.ThenableReference {
    var today = new Date();
    var milliseconds = today.getTime();
    milliseconds=milliseconds* -1;
    //let timestamp = firebase.database.ServerValue.TIMESTAMP;


    return this.eventListRef.push({name:text.ComplaintName,
      date:this.datepipe.transform(Date.now(), 'dd-MM-yyyy hh:mm:ss') ,
      number:text.PhoneNumber,Mtime:milliseconds
    });

  }


  createComp( text:Post): firebase.database.ThenableReference {
    var email: string = firebase.auth().currentUser.email;
    var today = new Date();
    var milliseconds = today.getTime();
    milliseconds=milliseconds* -1;
    return this.compRef.push({name:text.ComplaintName,
      date:this.datepipe.transform(Date.now(), 'dd-MM-yyyy hh:mm:ss'),
      number:text.PhoneNumber,email:email,time:milliseconds

    });
  }

  getEventList(): firebase.database.Reference {
    return this.eventListRef;
  }
  getCompList(): firebase.database.Reference {
    return this.compRef;
  }

  getEventDetail(eventId: string): firebase.database.Reference {
    return this.eventListRef.child(eventId);
  }

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

  /*addGuest(
   guestName: string,
   eventId: string,
   eventPrice: number,
   guestPicture: string = null
   ): PromiseLike<any> {
   return this.eventListRef
   .child(`${eventId}/guestList`)
   .push({ guestName })
   .then(newGuest => {
   this.eventListRef.child(eventId).transaction(event => {
   event.revenue += eventPrice;
   return event;
   });

   if (guestPicture != null) {
   firebase
   .storage()
   .ref(`/guestProfile/${newGuest.key}/profilePicture.png`)
   .putString(guestPicture, 'base64', {
   contentType: 'image/png'
   })
   .then(savedPicture => {
   this.eventListRef
   .child(`${eventId}/guestList/${newGuest.key}/profilePicture`)
   .set(savedPicture.downloadURL);
   });
   }
   });
   }*/
}
