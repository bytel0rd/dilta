import { ManagerDataFormComponent } from './managers-biodata-form/AdminSetup.component';
import { ParentBioProfileComponent } from './parent-bio-profile/parent-bio-profile.component';
import { ParentFormEditorComponent } from './parent-form-editor/parent-form-editor.component';
import { SchoolRouteModule, UserRouteModule } from './routes';
import { SchoolDataFormComponent } from './school-biodata-form/school.component';
import { StudentBioFormEditorComponent } from './student-bio-form-editor/student-bio-form-editor.component';
import { StudentBioProfileComponent } from './student-bio-profile/student-bio-profile.component';
import { UserBiodataProfileComponent } from './user-biodata-profile/user-biodata-profile.component';
import { UserBioDataFormPageComponent } from './user-biodata-setup/admin-biodata.component';
import { AdminUiSharedModule, ParentUiSharedModule, SchoolUiSharedModule } from '../components/modules';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientSharedModule } from '@dilta/client-shared';


const parents = [ParentBioProfileComponent, ParentFormEditorComponent];

@NgModule({
  imports: [ParentUiSharedModule],
  exports: parents,
  declarations: parents
})
export class ParentPageModule {}

const students = [StudentBioFormEditorComponent, StudentBioProfileComponent];
@NgModule({
  imports: [],
  exports: students,
  declarations: students
})
export class StudentPageModule {}

const users = [UserBioDataFormPageComponent, UserBiodataProfileComponent];
@NgModule({
  imports: [AdminUiSharedModule, ClientSharedModule, UserRouteModule, CommonModule],
  exports: users,
  declarations: users
})
export class UserPageModule {}

const schools = [SchoolDataFormComponent, ManagerDataFormComponent];
@NgModule({
  imports: [SchoolUiSharedModule, SchoolRouteModule, CommonModule, ClientSharedModule],
  exports: [...schools, SchoolUiSharedModule],
  declarations: schools
})
export class SchoolPageModule {}