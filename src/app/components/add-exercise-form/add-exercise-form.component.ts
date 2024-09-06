import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-add-exercise-form',
  template: `
    <form (ngSubmit)="onSubmit()" class="add-exercise-form">
      <input
        type="text"
        [(ngModel)]="exercise.title"
        name="title"
        placeholder="Exercise title"
        required
      >
      <input
        type="number"
        [(ngModel)]="exercise.time"
        name="time"
        placeholder="Time (minutes)"
        required
      >
      <textarea
        [(ngModel)]="exercise.description"
        name="description"
        placeholder="Description"
      ></textarea>
      <button type="submit">Add Exercise</button>
    </form>
  `,
  styles: [`
    .add-exercise-form {
      display: grid;
      gap: 10px;
    }
    input, textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    textarea {
      resize: vertical;
      min-height: 100px;
    }
    button {
      padding: 10px 20px;
      background-color: var(--secondary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s ease;
    }
  `]
})
export class AddExerciseFormComponent {
  @Output() addExercise = new EventEmitter<any>();
  exercise = { title: '', time: '', description: '', note: '' };

  onSubmit() {
    if (this.exercise.title && this.exercise.time) {
      this.addExercise.emit(this.exercise);
      this.exercise = { title: '', time: '', description: '', note: '' };
    }
  }
}
