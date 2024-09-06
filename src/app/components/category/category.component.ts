import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Category } from "../../models/category";

@Component({
  selector: 'app-category',
  template: `
    <div class="category-card">
      <div class="category-header">
        <h2 *ngIf="!isEditing" (click)="startEditing()">{{category.name}}</h2>
        <input *ngIf="isEditing" [(ngModel)]="editedName" (blur)="finishEditing()" (keyup.enter)="finishEditing()">
        <button class="delete-btn" (click)="onDeleteCategory()">Delete Category</button>
      </div>
      <app-exercise-list
        [exercises]="category.exercises"
        [categoryId]="category.id"
        (toggleExercise)="onToggleExercise($event)"
        (addNote)="onAddNote($event)"
        (deleteExercise)="onDeleteExercise($event)">
      </app-exercise-list>
      <div class="add-exercise-section">
        <button class="add-exercise-btn" (click)="toggleExerciseForm()">
          {{ showExerciseForm ? 'Cancel' : 'Add Exercise' }}
        </button>
        <app-add-exercise-form
          *ngIf="showExerciseForm"
          (addExercise)="onAddExercise($event)">
        </app-add-exercise-form>
      </div>
    </div>
  `,
  styles: [`
    .category-card {
      background-color: var(--card-background);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 20px;
      margin-bottom: 30px;
      width: 100%;
    }
    .category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    h2 {
      color: var(--primary-color);
      cursor: pointer;
      margin: 0;
      font-size: 1.8em;
    }
    input {
      font-size: 1.5em;
      color: var(--primary-color);
      border: none;
      border-bottom: 2px solid var(--primary-color);
      background-color: transparent;
      padding: 5px;
      width: 60%;
    }
    .delete-btn, .add-exercise-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s ease, opacity 0.3s ease;
    }
    .delete-btn {
      background-color: #ff4136;
      color: white;
    }
    .add-exercise-section {
      margin-top: 20px;
    }
    .add-exercise-btn {
      background-color: var(--secondary-color);
      color: white;
      width: 100%;
    }
    .delete-btn:hover, .add-exercise-btn:hover {
      opacity: 0.8;
    }
  `]
})
export class CategoryComponent {
  @Input() category!: Category;
  @Output() addExercise = new EventEmitter<{ categoryId: string, exercise: any }>();
  @Output() toggleExercise = new EventEmitter<{ categoryId: string, exerciseId: string }>();
  @Output() addNote = new EventEmitter<{ categoryId: string, exerciseId: string, note: string }>();
  @Output() deleteCategory = new EventEmitter<string>();
  @Output() updateCategoryName = new EventEmitter<{ categoryId: string, newName: string }>();
  @Output() deleteExercise = new EventEmitter<{ categoryId: string, exerciseId: string }>();

  showExerciseForm = false;
  isEditing = false;
  editedName = '';

  toggleExerciseForm() {
    this.showExerciseForm = !this.showExerciseForm;
  }

  onAddExercise(exercise: any) {
    this.addExercise.emit({ categoryId: this.category.id, exercise });
    this.showExerciseForm = false;
  }

  onToggleExercise(exerciseId: string) {
    this.toggleExercise.emit({ categoryId: this.category.id, exerciseId });
  }

  onAddNote(event: { exerciseId: string, note: string }) {
    this.addNote.emit({
      categoryId: this.category.id,
      exerciseId: event.exerciseId,
      note: event.note
    });
  }

  onDeleteCategory() {
    if (confirm('Are you sure you want to delete this category and all its exercises?')) {
      this.deleteCategory.emit(this.category.id);
    }
  }

  startEditing() {
    this.isEditing = true;
    this.editedName = this.category.name;
  }

  finishEditing() {
    if (this.editedName.trim() !== '' && this.editedName !== this.category.name) {
      this.updateCategoryName.emit({ categoryId: this.category.id, newName: this.editedName.trim() });
    }
    this.isEditing = false;
  }

  onDeleteExercise(exerciseId: string) {
    this.deleteExercise.emit({ categoryId: this.category.id, exerciseId });
  }
}
