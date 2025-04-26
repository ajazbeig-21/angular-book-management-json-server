import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EditBookModalComponent } from '../edit-book-modal/edit-book-modal.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  books: any[] = [];
  username: string | null = localStorage.getItem('username'); // Get username from localStorage
  isLoading: boolean = true;
  errorMessage: string = '';
  
  constructor(private userService: UserService, public router:Router) {}

  ngOnInit(): void {
    if (this.username) {
      this.userService.getBooksByUser(this.username).subscribe(
        (books:any) => {
          this.books = books;
          this.isLoading = false;
        },
        (error:any) => {
          console.error('Error fetching books:', error);
          this.errorMessage = 'There was an error fetching the book list.';
          this.isLoading = false;
        }
      );
    } else {
      this.router.navigate(['/login']); // Redirect to login if no user found in localStorage
    }
  }


  // Function to handle editing a book
  // editBook(book: any): void {
  //   const modalRef = this.modalService.open(EditBookModalComponent, { size: 'lg' });
  //   modalRef.componentInstance.book = book; // Pass the book data to the modal
  //   modalRef.result.then(
  //     (updatedBook:any) => {
  //       if (updatedBook) {
  //         // Call service to update book
  //         this.userService.updateBook(book.id, updatedBook).subscribe(
  //           (response) => {
  //             console.log('Book updated successfully:', response);
  //             // Refresh the list of books after update
  //             this.loadBooks();
  //           },
  //           (error) => {
  //             console.error('Error updating book:', error);
  //           }
  //         );
  //       }
  //     },
  //     (reason:any) => {
  //       // Handle modal close or dismiss
  //       console.log('Modal closed');
  //     }
  //   );
  // }


  // Function to handle deleting a book
  deleteBook(bookId: number): void {
      this.userService.deleteBook(bookId).subscribe(
        (response) => {
          console.log('Book deleted successfully:', response);
          // Refresh the list of books after deletion
          this.loadBooks();
        },
        (error) => {
          console.error('Error deleting book:', error);
        }
      );
  }
  loadBooks(): void {
    if (this.username) {
      this.userService.getBooksByUser(this.username).subscribe(
        (books) => {
          this.books = books;
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
    }
  }

}
