import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { BodyComponent } from './Components/body/body.component';
import { FooterComponent } from './Components/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { ErrorComponent } from './Components/error/error.component';
import { RouterModule  } from '@angular/router';


let routes=[
  {path:'',component :BodyComponent},
  {path:'**',component:ErrorComponent}
]

@NgModule({
  declarations: [ 
    AppComponent,
    NavBarComponent,
    BodyComponent,
    FooterComponent,
    ErrorComponent


   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
