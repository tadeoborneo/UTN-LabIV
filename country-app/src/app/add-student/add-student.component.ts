import { Component } from '@angular/core';
import { Student } from '../student';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styles: ``
})
export class AddStudentComponent {
  constructor(private studentService:StudentsService){};

  public name: string = '';
  public lastname: string = '';
  public dni: string = '';
  public address: string = '';
  public email: string = '';
  
  addStudent() : void{
    let std: Student = {
      id: 0,
      name: this.name ,
      lastname: this.lastname,
      dni: this.dni,
      email: this.address,
      address: this.email
    };

    this.studentService.addStudent(std);
  };

}
