import { Component } from '@angular/core';
import { CategoryService } from "./services/Category.service";
import { Category } from "./models/category";

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Guitar Practice & Music Theory Helper</h1>
      </header>
      <main class="main-content">
        <div class="category-input">
          <app-add-category-form (addCategory)="addCategory($event)"></app-add-category-form>
        </div>
        <app-category-list
          [categories]="categories"
          (addExercise)="addExercise($event)"
          (toggleExercise)="toggleExercise($event)"
          (addNote)="addNote($event)"
          (deleteCategory)="deleteCategory($event)"
          (updateCategoryName)="updateCategoryName($event)"
          (deleteExercise)="deleteExercise($event)">
        </app-category-list>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      width: 90%;
      max-width: 1600px;
      margin: 0 auto;
      padding: 20px;
      background-color: var(--background-color);
      min-height: 100vh;
    }
    .app-header {
      text-align: center;
      margin-bottom: 40px;
    }
    h1 {
      color: var(--primary-color);
      font-size: 2.5rem;
      font-weight: 700;
    }
    .main-content {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .category-input {
      width: 100%;
      margin-bottom: 30px;
    }
  `]
})
export class AppComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }

  addCategory(name: string) {
    this.categoryService.addCategory(name);
    this.updateCategories();
  }

  addExercise(event: { categoryId: string, exercise: any }) {
    this.categoryService.addExercise(event.categoryId, event.exercise);
    this.updateCategories();
  }

  toggleExercise(event: { categoryId: string, exerciseId: string }) {
    this.categoryService.toggleExercise(event.categoryId, event.exerciseId);
    this.updateCategories();
  }

  addNote(event: { categoryId: string, exerciseId: string, note: string }) {
    this.categoryService.addNote(event.categoryId, event.exerciseId, event.note);
    this.updateCategories();
  }

  deleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId);
    this.updateCategories();
  }

  updateCategoryName(event: { categoryId: string, newName: string }) {
    this.categoryService.updateCategoryName(event.categoryId, event.newName);
    this.updateCategories();
  }

  deleteExercise(event: { categoryId: string, exerciseId: string }) {
    this.categoryService.deleteExercise(event.categoryId, event.exerciseId);
    this.updateCategories();
  }

  private updateCategories() {
    this.categories = this.categoryService.getCategories();
  }
}
