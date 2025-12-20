import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { ButtonShowcaseComponent } from './components/button-showcase/button-showcase.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { AccordionShowcaseComponent } from './components/accordion-showcase/accordion-showcase.component';
import { UploadComponent } from './components/upload/upload.component';
import { UploadShowcaseComponent } from './components/upload-showcase/upload-showcase.component';
import { CardComponent } from './components/card/card.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ButtonShowcaseComponent,
    AccordionComponent,
    AccordionShowcaseComponent,
    UploadComponent,
    UploadShowcaseComponent,
    CardComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

