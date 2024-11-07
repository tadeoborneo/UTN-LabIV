import { Injectable } from '@angular/core';
import { Student } from '../student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  public studentList: Student[] = [];

  constructor() { }


  addStudent(student: Student): void {
    student.id = this.studentList.length + 1;
    this.studentList.push(student);
    
  }

  getStudents(): Student[] {
    return this.studentList;
  }
}
