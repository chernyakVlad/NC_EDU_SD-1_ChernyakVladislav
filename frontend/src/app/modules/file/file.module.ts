import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileListComponent } from './component/file-list/file-list.component';
import { FileUploaderComponent } from './component/file-uploader/file-uploader.component';
import { AddFileModalComponent } from './component/add-file-modal/add-file-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { FileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    FileListComponent,
    FileUploaderComponent,
    AddFileModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FileDropModule
  ],
  exports: [FileUploaderComponent, FileListComponent],
  entryComponents:[AddFileModalComponent]
})
export class FileModule { }
