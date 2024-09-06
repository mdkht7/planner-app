import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Exercise } from "../../models/exercise";

@Component({
  selector: 'app-exercise-list',
  template: `
    <div class="exercise-grid">
      <app-exercise
        *ngFor="let exercise of exercises"
        [exercise]="exercise"
        (toggleExercise)="onToggleExercise($event)"
        (addNote)="onAddNote($event)"
        (deleteExercise)="onDeleteExercise($event)">
      </app-exercise>
    </div>
  `,
  styles: [`
    .exercise-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      width: 100%;
    }
    @media (min-width: 1200px) {
      .exercise-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `]
})
export class ExerciseListComponent {
  @Input() exercises: Exercise[] = [];
  @Input() categoryId!: string;
  @Output() toggleExercise = new EventEmitter<string>();
  @Output() addNote = new EventEmitter<{ exerciseId: string, note: string }>();
  @Output() deleteExercise = new EventEmitter<string>();

  onToggleExercise(exerciseId: string) {
    this.toggleExercise.emit(exerciseId);
  }

  onAddNote(event: { exerciseId: string, note: string }) {
    this.addNote.emit(event);
  }

  onDeleteExercise(exerciseId: string) {
    this.deleteExercise.emit(exerciseId);
  }
}
