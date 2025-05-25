import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { UiBuilderComponent } from './ui-builder/ui-builder.component';

@NgModule({
  declarations: [
    // No standalone components here
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    FormsModule,
    UiBuilderComponent // Standalone component imported here
  ],
  providers: []
})
export class AppModule { }
