import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  addBookForm!: FormGroup; // Reactive form
  message: string = ''; // Success message after adding book

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Initialize form controls
    this.addBookForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      name: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.addBookForm.valid) {
      const { id, name, author } = this.addBookForm.value;
      const username = localStorage.getItem('username'); // Get the logged-in username from localStorage

      if (username) {
        const newBook = { id, name, author, username }; // Add the username to associate the book with the logged-in user

        // Call the userService to add the book
        this.userService.addBook(newBook).subscribe(
          (response: any) => {
            this.message = 'Book added successfully!'; // Success message
            this.addBookForm.reset(); // Reset the form
          },
          (error: any) => {
            console.error('Error adding book:', error);
            this.message = 'Failed to add book. Please try again.';
          }
        );
      } else {
        console.error('No user logged in');
        this.message = 'Please log in first.';
      }
    }
  }
}
