import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Array to hold the list of users
  isLoading: boolean = true; // To show loading state while data is being fetched
  errorMessage: string = ''; // To show error message if there's any issue fetching users

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Call the service to get the list of users
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users; // Assign the fetched users to the users array
        this.isLoading = false; // Set loading to false when data is received
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'There was an error fetching the user list.'; // Show error message
        this.isLoading = false;
      }
    );
  }
}
