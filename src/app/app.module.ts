import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import {AngularFireAuth} from "angularfire2/auth";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { EventProvider } from '../providers/event/event';
import { ProfileProvider } from '../providers/profile/profile';
import {SMS} from "@ionic-native/sms";
import {LoginPage} from "../pages/login/login";
import {LoginPageModule} from "../pages/login/login.module";
import {DatePipe} from "@angular/common";
import {EventCreatePage} from "../pages/event-create/event-create";
import {EventListPage} from "../pages/event-list/event-list";
import {TabsPage} from "../pages/tabs/tabs";
import {ProfilePage} from "../pages/profile/profile";
import {AngularFireDatabase} from "angularfire2/database";
import {PublicPage} from "../pages/public/public";

export const  firebaseConfig= {

  apiKey: "AIzaSyB6W1swmsUvohkN1lfpiBE6INr_5aN697E",
  authDomain: "eventmanager-f60ff.firebaseapp.com",
  databaseURL: "https://eventmanager-f60ff.firebaseio.com",
  projectId: "eventmanager-f60ff",
  storageBucket: "eventmanager-f60ff.appspot.com",
  messagingSenderId: "739155250286"
}

@NgModule({
  declarations: [MyApp, HomePage,EventCreatePage,EventListPage,TabsPage,ProfilePage,PublicPage],
  imports: [BrowserModule,LoginPageModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage,LoginPage,EventCreatePage,EventListPage,TabsPage,ProfilePage,PublicPage],
  providers: [
    StatusBar,
    AngularFireDatabase,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    EventProvider,
    ProfileProvider,
    SMS,
    DatePipe,
    AngularFireAuth,

  ]
})
export class AppModule {
 //constructor(){ var email: string = firebase.auth().currentUser.email;}

}
