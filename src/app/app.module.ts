import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TuiInputNumberModule,
    TuiCurrencyPipeModule,
    TuiDialogModule,
    TuiRootModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
