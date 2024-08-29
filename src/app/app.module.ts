import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ConfigComponent } from './pages/config/config.component';
import { EventComponent } from './pages/config/event/event.component';
import { FormsModule } from '@angular/forms';
import { SearchModalComponent } from './components/search-modal/search-modal.component';
import { PopupModalComponent } from './components/popup-modal/popup-modal.component';
import { InputModalComponent } from './components/input-modal/input-modal.component';
import { InputBarComponent } from './components/input-bar/input-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AuthComponent,
    ConfigComponent,
    EventComponent,
    SearchModalComponent,
    PopupModalComponent,
    InputModalComponent,
    InputBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
