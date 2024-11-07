import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { ViewStudentComponent } from './view-student/view-student.component';

const routes: Routes = [
  { path: "add", component: AddStudentComponent },
  { path: "view/:id", component: ViewStudentComponent },
  { path: "list", component: ListStudentsComponent },
  { path: "**", redirectTo: "list" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
