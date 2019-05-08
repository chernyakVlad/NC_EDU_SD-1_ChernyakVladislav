import { Component, OnInit, TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from 'src/app/modules/user/models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NewProjectModalComponent } from 'src/app/modules/project/components/new-project-modal/new-project-modal.component';
import { Observable } from 'rxjs';
import { Task } from '../../models/Task';
import { TaskService } from 'src/app/_services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.less']
})
export class TasksComponent implements OnInit { 

  public tasks: Task[];
  public modalRef: BsModalRef;
  public currentUser: string;
  public username: string;

  public pageSize = 8;
  public currentPage = 0;
  public totalItems = 0;

  constructor(
    private modalService: BsModalService,
    private authenticationService: AuthenticationService,
    private tasksService: TaskService
  ) {}

  ngOnInit() {     
    this.updateTasks();
  } 

  pageChanged(event: any): void {    
    this.currentPage = event.page - 1;    
    this.updateTasks();    
  }

  updateTasks(){
    this.tasksService.getAllByUsername(this.authenticationService.currentUsername, this.currentPage, this.pageSize, 'id').subscribe(data => {
      this.tasks = data.content;
      this.totalItems = data.totalElements;
      console.log(this.tasks);
    })
    console.log(this.authenticationService.tokenValue)

  }

 

  public _closeModal(){
    this.modalRef.hide();
  }  
}
