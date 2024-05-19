import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { categoryOutput } from '../../models/categoryOutput';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
            CommonModule, 
            FormsModule, 
            HttpClientModule, 
            HeaderComponent, 
            LoginComponent,
            RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WineShop';
  categories: Array<categoryOutput>;

  id: number | undefined;
  categoryGetById: categoryOutput | undefined;

  viewModeType: ViewModeType = ViewModeType.Normal;

  getAll() {
    this.categoryService.getAll().subscribe({
      next: (result) => {
        this.categories = result;
        console.log(this.categories);
      },
      error: (err) => {
        console.log("Errore: " + err);
      }
    });
  }

  getById() {
    if (this.id !== undefined && this.id !== null) {
      this.categoryService.getById(this.id).subscribe({
        next: (result) => {
          this.categoryGetById = result;
        },
        error: () => {
          console.log("Tuo padre bastardo");
        }
      });

      this.id = undefined;
    } else {
      this.categoryGetById = undefined;
    }
  }

  //Metodo per cambiare la view mode
  setViewMode(mode: ViewModeType) {
    this.viewModeType = mode;
  }

  constructor(public categoryService: CategoryService, public authService: AuthService) {
    this.categories = [];
  }
}

//Enum con i tipi di pagina da visualizzare disponibili
export enum ViewModeType {
  Normal = "Normal",
  Login = "Login",
  Register = "Register"
}