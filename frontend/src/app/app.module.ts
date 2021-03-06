import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';
import { BsModalService, BsDropdownModule, ModalModule, TooltipModule, PaginationModule, TypeaheadModule } from 'ngx-bootstrap';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {InputEditorModule} from 'angular-inline-editors';
import { SelectEditorModule } from 'angular-inline-editors';
import { FileSizePipe } from './pipes/file-size.pipe';
import { AlertModule } from 'ngx-alerts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    InputEditorModule.forRoot(),
    SelectEditorModule.forRoot(),
    AlertModule.forRoot({maxMessages: 5, timeout: 7000, position: 'right'}),
    HttpClientModule
  ],
  providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
