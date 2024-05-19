import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { loginModel, loginResult } from "../models/loginModel";
import { Observable, tap } from "rxjs";
import { response } from "../models/response";
import { registerModel } from "../models/registerModel";

@Injectable({
    providedIn: "any"
})
export class AuthService {

    //Property che permette di salvare l'username da mostrare nell'header
    private _username: string = "Login";

    get username(): string {
        return this._username
    }

    constructor(private http: HttpClient) {}

    //Fetch per registrarsi
    register(model: registerModel): Observable<response> {
        return this.http.post<response>("https://localhost:7065/api/Authenticate/Register", model);
    }

    //Fetch per loggarsi e salvare il token nel local storage
    login(model: loginModel): Observable<loginResult> {
        return this.http.post<loginResult>("https://localhost:7065/api/Authenticate/Login", model).pipe(tap(result => {
            localStorage.setItem("token", result.token);
            localStorage.setItem("expiration", result.expiration);
            localStorage.setItem("role", result.role);

            this._username = model.username;
        }));
    }

    //Logout cancellando il token dal localstorage
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("role");

        this._username = "Login";
    }

    //Metodo che dice se siamo loggati (controlla esistenza token e data di scadenza)
    islogged() {
        return this.getRole() !== null && !this.isTokenExpired(); 
    }

    //Metodo che restituisce il token
    getToken(): string | null {
        return localStorage.getItem("token");
    }

    //Metodo che restituisce la data di scadenza del token
    getExpiration(): Date | null {
        let result = localStorage.getItem("expiration");

        if (result !== null)
            return new Date(result);

        return null;
    }

    //Metodo che restituisce il ruolo dell'utente (User o admin)
    getRole(): string | null {
        return localStorage.getItem("role");
    }

    //Metodo che dice se il token è scaduto
    isTokenExpired(): boolean {
        let expiration = this.getExpiration();

        if (!expiration) {
          return true;
        }

        let now = new Date().getTime();
        let expirationDate = new Date(expiration).getTime();

        return now > expirationDate;
      }
}