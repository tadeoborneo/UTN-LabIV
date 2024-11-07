import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styles: ``
})
export class ListStudentsComponent implements OnInit {
  public studentList: Student[] = [];

  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {
    this.studentList = this.studentService.getStudents();
  }   
}
