import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-book-modal',
  templateUrl: './edit-book-modal.component.html',
  styleUrls: ['./edit-book-modal.component.scss']
})
export class EditBookModalComponent {
  @Input() book?: any; // Input to receive the book to be edited
  @Output() closeModal = new EventEmitter();
  @Output() saveBook = new EventEmitter();

  updatedBook: any = { ...this.book }; // Make a copy of the book for editing

  close(): void {
    this.closeModal.emit();
  }

  save(): void {
    this.saveBook.emit(this.updatedBook); // Emit the updated book data
  }
}
