import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  template: `
    <div class="timer">
      <button (click)="toggleTimer()" [disabled]="timeRemaining === 0">
        {{ isRunning ? 'Pause' : (timeRemaining === totalTime ? 'Start' : 'Resume') }}
      </button>
      <button (click)="resetTimer()" [disabled]="timeRemaining === totalTime">Reset</button>
      <span class="time-display">{{ formatTime(timeRemaining) }}</span>
    </div>
  `,
  styles: [`
    .timer {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
    }
    button {
      padding: 5px 10px;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .time-display {
      font-size: 1.2em;
      font-weight: bold;
    }
  `]
})
export class TimerComponent implements OnDestroy {
  @Input() totalTime: number = 0;
  @Output() timerComplete = new EventEmitter<void>();

  private timerSubscription?: Subscription;
  private timer$ = new BehaviorSubject<number>(0);

  timeRemaining: number = 0;
  isRunning: boolean = false;

  ngOnInit() {
    this.timeRemaining = this.totalTime;
  }

  toggleTimer() {
    if (this.isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.timerSubscription = interval(1000)
        .pipe(takeWhile(() => this.timeRemaining > 0))
        .subscribe(() => {
          this.timeRemaining--;
          this.timer$.next(this.timeRemaining);
          if (this.timeRemaining === 0) {
            this.timerComplete.emit();
            this.isRunning = false;
          }
        });
    }
  }

  pauseTimer() {
    this.isRunning = false;
    this.timerSubscription?.unsubscribe();
  }

  resetTimer() {
    this.pauseTimer();
    this.timeRemaining = this.totalTime;
    this.timer$.next(this.timeRemaining);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }
}
