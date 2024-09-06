import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Exercise } from "../../models/exercise";

@Component({
  selector: 'app-exercise',
  template: `
    <div class="exercise-item" [class.completed]="exercise.completed">
      <div class="exercise-header">
        <h3>{{exercise.title}}</h3>
        <span class="exercise-time">{{exercise.time}} min</span>
        <button class="delete-btn" (click)="onDelete()">Delete</button>
      </div>
      <p class="exercise-description">{{exercise.description}}</p>
      <app-timer [totalTime]="exercise.time * 60" (timerComplete)="onTimerComplete()"></app-timer>
      <div class="exercise-notes">
        <h4>Notes:</h4>
        <ul>
          <li *ngFor="let note of exercise.notes">{{note}}</li>
        </ul>
      </div>
      <div class="exercise-actions">
        <label class="checkbox-container">
          Completed
          <input type="checkbox" [checked]="exercise.completed" (change)="onToggle()">
          <span class="checkmark"></span>
        </label>
        <button (click)="toggleNoteForm()" class="add-note-btn">
          {{ showNoteForm ? 'Cancel' : 'Add Note' }}
        </button>
      </div>
      <div *ngIf="showNoteForm" class="note-form">
        <textarea [(ngModel)]="newNote" placeholder="Enter your note"></textarea>
        <button (click)="onAddNote()" [disabled]="!newNote.trim()">Save Note</button>
      </div>
    </div>
  `,
  styles: [`
    .exercise-item {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
      transition: background-color 0.3s ease;
    }
    .exercise-item.completed {
      background-color: #e6f7e6;
    }
    .exercise-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    h3 {
      margin: 0;
      color: var(--primary-color);
    }
    .exercise-time {
      font-weight: bold;
      color: var(--primary-color);
    }
    .exercise-description {
      margin-bottom: 10px;
    }
    .exercise-notes {
      margin-top: 10px;
    }
    .exercise-notes h4 {
      margin-bottom: 5px;
    }
    .exercise-notes ul {
      padding-left: 20px;
      margin: 0;
    }
    .exercise-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
    .checkbox-container {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .checkbox-container input {
      margin-right: 5px;
    }
    .delete-btn, .add-note-btn {
      padding: 5px 10px;
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
    .add-note-btn {
      background-color: var(--secondary-color);
      color: white;
    }
    .delete-btn:hover, .add-note-btn:hover {
      opacity: 0.8;
    }
    .note-form {
      margin-top: 10px;
    }
    .note-form textarea {
      width: 100%;
      padding: 5px;
      margin-bottom: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .note-form button {
      padding: 5px 10px;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .note-form button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class ExerciseComponent {
  @Input() exercise!: Exercise;
  @Output() toggleExercise = new EventEmitter<string>();
  @Output() addNote = new EventEmitter<{ exerciseId: string, note: string }>();
  @Output() deleteExercise = new EventEmitter<string>();

  showNoteForm = false;
  newNote = '';

  onToggle() {
    this.toggleExercise.emit(this.exercise.id);
  }

  toggleNoteForm() {
    this.showNoteForm = !this.showNoteForm;
    this.newNote = '';
  }

  onAddNote() {
    if (this.newNote.trim()) {
      this.addNote.emit({ exerciseId: this.exercise.id, note: this.newNote.trim() });
      this.newNote = '';
      this.showNoteForm = false;
    }
  }

  onTimerComplete() {
    if (!this.exercise.completed) {
      this.onToggle();
    }
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this exercise?')) {
      this.deleteExercise.emit(this.exercise.id);
    }
  }
}
