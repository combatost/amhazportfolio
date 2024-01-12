import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactmeComponent } from './contactme/contactme.component';
import { AngularFireModule } from '@angular/fire/compat';
import { FirePort } from './fire-port/fire-port';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; 





@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    ContactmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(FirePort.firebaseConfig),
    AngularFirestoreModule ,









  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
