import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule} from 'angularfire2/';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';




var firebaseConfig = {
  apiKey: "AIzaSyD89ehMe8mmE5mxN5d1H2m_dzGuCSfjFro",
  authDomain: "appworkit-40d0e.firebaseapp.com",
  databaseURL: "https://appworkit-40d0e.firebaseio.com",
  projectId: "appworkit-40d0e",
  storageBucket: "appworkit-40d0e.appspot.com",
  messagingSenderId: "888973686558",
  appId: "1:888973686558:web:84e881a9b19236d410fb0f",
  measurementId: "G-4FSPYM3123"
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
BrowserModule,AngularFirestoreModule, AngularFireAuthModule, 
  AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
