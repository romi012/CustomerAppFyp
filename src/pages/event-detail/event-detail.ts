import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';


@IonicPage({
  segment: 'event-detail/:eventId'
})
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
  public currentEvent: any = {};

 // guestName: string;
 // guestPicture: string
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,

  ) {}

  ionViewDidLoad() {
    //var dateTime = firebase.database.ServerValue.TIMESTAMP;
    this.eventProvider
      .getEventDetail(this.navParams.get('eventId')).orderByChild('timestamp').on('value', eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });
  }

  /*addGuest(guestName: string): void {
    this.eventProvider
      .addGuest(
        guestName,
        this.currentEvent.id,
        this.currentEvent.price,
        this.guestPicture
      )
      .then(newGuest => {
        this.guestName = '';
        this.guestPicture = null;
      });
  }

  takePicture(): void {
    this.cameraPlugin
      .getPicture({
        quality: 95,
        destinationType: this.cameraPlugin.DestinationType.DATA_URL,
        sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: this.cameraPlugin.EncodingType.PNG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      })
      .then(
        imageData => {
          this.guestPicture = imageData;
        },
        error => {
          console.log('ERROR -> ' + JSON.stringify(error));
        }
      );
  }*/
}
