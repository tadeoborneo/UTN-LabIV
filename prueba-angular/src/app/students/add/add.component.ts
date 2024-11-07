import { Component, EventEmitter, Input, input } from '@angular/core';
import { Student } from '../student';

@Component({
  selector: 'app-student-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  @Output()
  newStudent = new EventEmitter<Student>();
  
}
