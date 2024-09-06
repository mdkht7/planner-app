import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-add-category-form',
  template: `
    <form (ngSubmit)="onSubmit()" class="add-category-form">
      <input
        type="text"
        [(ngModel)]="name"
        name="name"
        placeholder="Enter new category name"
        required
      >
      <button type="submit">Add Category</button>
    </form>
  `,
  styles: [`
    .add-category-form {
      display: flex;
      width: 100%;
    }
    input {
      flex-grow: 1;
      padding: 10px;
      border: 1px solid var(--primary-color);
      border-radius: 4px 0 0 4px;
      font-size: 16px;
    }
    button {
      padding: 10px 20px;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s ease;
    }
    button:hover {
      opacity: 0.9;
    }
  `]
})
export class AddCategoryFormComponent {
  @Output() addCategory = new EventEmitter<string>();
  name = '';

  onSubmit() {
    if (this.name.trim()) {
      this.addCategory.emit(this.name.trim());
      this.name = '';
    }
  }
}

