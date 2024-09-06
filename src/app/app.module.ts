import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms";
import {AddExerciseFormComponent} from "./components/add-exercise-form/add-exercise-form.component";
import {ExerciseComponent} from "./components/exercise/exercise.component";
import {ExerciseListComponent} from "./components/exercise-list/exercise-list.component";
import {AddCategoryFormComponent} from "./components/add-category-form/add-category-form.component";
import {CategoryComponent} from "./components/category/category.component";
import {CategoryListComponent} from "./components/category-list/category-list.component";
import {AppComponent} from "./app.component";
import { TimerComponent } from './components/timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    CategoryComponent,
    AddCategoryFormComponent,
    ExerciseListComponent,
    ExerciseComponent,
    AddExerciseFormComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
