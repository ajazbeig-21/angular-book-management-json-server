import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BookListComponent } from './book-list/book-list.component';
import { EditBookModalComponent } from './edit-book-modal/edit-book-modal.component';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'add', component: AddBookComponent },
  { path: 'edit', component: EditBookModalComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
