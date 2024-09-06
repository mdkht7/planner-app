import { Injectable } from '@angular/core';
import {Category} from "../models/category";
import {Exercise} from "../models/exercise";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];

  getCategories(): Category[] {
    return this.categories;
  }

  addCategory(name: string) {
    const newCategory: Category = {
      id: this.generateId(),
      name,
      exercises: []
    };
    this.categories.push(newCategory);
  }

  updateCategoryName(categoryId: string, newName: string) {
    const category = this.categories.find(c => c.id === categoryId);
    if (category) {
      category.name = newName;
    }
  }

  deleteCategory(categoryId: string) {
    this.categories = this.categories.filter(c => c.id !== categoryId);
  }

  addExercise(categoryId: string, exercise: Omit<Exercise, 'id' | 'completed' | 'notes'>) {
    const category = this.categories.find(c => c.id === categoryId);
    if (category) {
      const newExercise: Exercise = {
        ...exercise,
        id: this.generateId(),
        completed: false,
        notes: []
      };
      category.exercises.push(newExercise);
    }
  }

  deleteExercise(categoryId: string, exerciseId: string) {
    const category = this.categories.find(c => c.id === categoryId);
    if (category) {
      category.exercises = category.exercises.filter(e => e.id !== exerciseId);
    }
  }

  toggleExercise(categoryId: string, exerciseId: string) {
    const category = this.categories.find(c => c.id === categoryId);
    if (category) {
      const exercise = category.exercises.find(e => e.id === exerciseId);
      if (exercise) {
        exercise.completed = !exercise.completed;
      }
    }
  }

  addNote(categoryId: string, exerciseId: string, note: string) {
    const category = this.categories.find(c => c.id === categoryId);
    if (category) {
      const exercise = category.exercises.find(e => e.id === exerciseId);
      if (exercise) {
        exercise.notes.push(note);
      }
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
