import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ModalModule, BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';
import { NewProjectModalComponent } from '../project/components/new-project-modal/new-project-modal.component';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { TasksOnTheProjectTableComponent } from './components/tasks-on-the-project-table/tasks-on-the-project-table.component';
import { FileModule } from '../file/file.module';
import { AddFileModalComponent } from '../file/component/add-file-modal/add-file-modal.component';
import { CommentModule } from '../comment/comment.module';
import { TaskStatusViewComponent } from './components/task-status-view/task-status-view.component';
import { TaskPriorityViewComponent } from './components/task-priority-view/task-priority-view.component';
import { AssigneeModalComponent } from './components/assignee-modal/assignee-modal.component';




@NgModule({
  declarations: [      
    TasksTableComponent,
    TaskDetailComponent,
    NewTaskModalComponent,
    TasksOnTheProjectTableComponent,
    TaskStatusViewComponent,
    TaskPriorityViewComponent,
    AssigneeModalComponent     
  ],
  imports: [
    CommentModule,
    FileModule,
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(), 
  ],
  exports: [TasksTableComponent, TaskDetailComponent, TasksOnTheProjectTableComponent],
  entryComponents:[NewTaskModalComponent, AddFileModalComponent, AssigneeModalComponent]
  
})
export class TaskModule { }
