import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { TaskModule } from '../task/task.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/authentication.service';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { UserModule } from '../user/user.module';
import { FooterComponent } from './footer/footer.component';
import { ProjectModule } from '../project/project.module';
import { TabsModule, BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent],
  imports: [
    CommonModule,
    TaskModule,
    ProjectModule,
    ReactiveFormsModule,
    UserModule,
    RouterModule, 
    TabsModule.forRoot(),
    BsDropdownModule.forRoot()
  ],  
  exports:[HeaderComponent, LoginComponent, HomeComponent, FooterComponent],
  providers: [UserService, AuthService]
  
})
export class LayoutModule { }
