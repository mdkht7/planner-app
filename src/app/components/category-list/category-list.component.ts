import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from "../../models/category";

@Component({
  selector: 'app-category-list',
  template: `
    <div class="category-list">
      <app-category
        *ngFor="let category of categories"
        [category]="category"
        (addExercise)="onAddExercise($event)"
        (toggleExercise)="onToggleExercise($event)"
        (addNote)="onAddNote($event)"
        (deleteCategory)="onDeleteCategory($event)"
        (updateCategoryName)="onUpdateCategoryName($event)"
        (deleteExercise)="onDeleteExercise($event)">
      </app-category>
    </div>
  `,
  styles: [`
    .category-list {
      display: flex;
      flex-direction: column;
      gap: 30px;
      width: 100%;
    }
  `]
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Output() addExercise = new EventEmitter<{ categoryId: string, exercise: any }>();
  @Output() toggleExercise = new EventEmitter<{ categoryId: string, exerciseId: string }>();
  @Output() addNote = new EventEmitter<{ categoryId: string, exerciseId: string, note: string }>();
  @Output() deleteCategory = new EventEmitter<string>();
  @Output() updateCategoryName = new EventEmitter<{ categoryId: string, newName: string }>();
  @Output() deleteExercise = new EventEmitter<{ categoryId: string, exerciseId: string }>();

  onAddExercise(event: { categoryId: string, exercise: any }) {
    this.addExercise.emit(event);
  }

  onToggleExercise(event: { categoryId: string, exerciseId: string }) {
    this.toggleExercise.emit(event);
  }

  onAddNote(event: { categoryId: string, exerciseId: string, note: string }) {
    this.addNote.emit(event);
  }

  onDeleteCategory(categoryId: string) {
    this.deleteCategory.emit(categoryId);
  }

  onUpdateCategoryName(event: { categoryId: string, newName: string }) {
    this.updateCategoryName.emit(event);
  }

  onDeleteExercise(event: { categoryId: string, exerciseId: string }) {
    this.deleteExercise.emit(event);
  }
}
