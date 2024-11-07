import { Component } from '@angular/core';
import { Student } from '../student'

@Component({
  selector: 'app-student-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

@Input() 
studentList : Array<Student> = new Array<Student>();


deleteLastStudent():void{
  this.studentList.pop();
}
}
