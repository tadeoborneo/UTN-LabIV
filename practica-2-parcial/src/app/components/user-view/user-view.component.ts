import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
      this.getUsers();
  }

  deleteUser(id : number):void{
    this.userService.deleteById(id).subscribe(response=>console.log(response));
    this.getUsers();
  }

  getUsers():void{
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })
  }
}
