import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Call the service to verify user credentials
      this.userService.loginUser(username, password).subscribe(
        (users: any) => {
          if (users.length > 0) {
            // Store the username in localStorage
            localStorage.setItem('username', username);
            this.router.navigate(['/layout/book']);
          } else {
            alert('Invalid username or password');
          }
        },
        (error: any) => {
          console.error('Error logging in:', error);
          alert('Error logging in. Please try again later.');
        }
      );
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['auth/register']);
  }
}
