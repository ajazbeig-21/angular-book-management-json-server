import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // URL to JSON Server
  private booksUrl = 'http://localhost:3000/books'; // URL to Books API

  constructor(private http: HttpClient) {}

  // Method to register a new user
  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // Method to login a user by checking credentials
  loginUser(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      catchError(() => of([])) // Return an empty array if error occurs
    );
  }

  // Method to fetch all users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

   // Get books by username
   getBooksByUser(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.booksUrl}?username=${username}`);
  }

  // Add a new book (if necessary)
  addBook(book: any): Observable<any> {
    return this.http.post(this.booksUrl, book);
  }

  // Update a book
  updateBook(id: number, updatedBook: any): Observable<any> {
    return this.http.put(`${this.booksUrl}/${id}`, updatedBook);
  }

  // Delete a book
  deleteBook(bookId: number): Observable<any> {
    return this.http.delete(`${this.booksUrl}/${bookId}`);
  }
}
