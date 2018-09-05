import {Component, ViewChild} from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';


import { HomePage } from '../pages/home/home';
import {firebaseConfig} from "./app.module";
import {LoginPage} from "../pages/login/login";
import {EventCreatePage} from "../pages/event-create/event-create";
import {ProfilePage} from "../pages/profile/profile";
import {TabsPage} from "../pages/tabs/tabs";
export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
email:string;

  appMenuItems: Array<MenuItem>;


  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {

    firebase.initializeApp(firebaseConfig);
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {

      if (!user) {
        this.rootPage = LoginPage;
        unsubscribe();
      } else {
        //firebase.initializeApp(firebaseConfig);

        this.email=firebase.auth().currentUser.email;
        this.rootPage = HomePage;
        unsubscribe();
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    //var email: string = firebase.auth().currentUser.email;

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Register complaint', component: EventCreatePage, icon: 'create'},
      {title: 'Complaint List', component: TabsPage, icon: 'book'}
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }

  profile(): void {
    this.nav.push(ProfilePage);
  }



}
