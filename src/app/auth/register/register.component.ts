import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup ;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.registerForm?.valid) {
      const { username, email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        alert("Passwords don't match.");
        return;
      }

      // Call the service to add the user
      this.userService.createUser({ username, email, password }).subscribe(
        (response) => {
          console.log('User created:', response);
          this.router.navigate(['/login']); // Navigate to login after successful registration
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }
}
