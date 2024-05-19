import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { categoryOutput } from "../models/categoryOutput";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "any"
})
export class CategoryService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    getAll(): Observable<Array<categoryOutput>> {
        return this.http.get<Array<categoryOutput>>("https://localhost:7065/Category/ReadAll", {
            headers: new HttpHeaders(`Authorization: Bearer ${this.authService.getToken()}`)
        });
    }

    getById(id: number): Observable<categoryOutput> {
        return this.http.get<categoryOutput>(`https://localhost:7065/Category/Read/${id}`, {
            headers: new HttpHeaders(`Authorization: Bearer ${this.authService.getToken()}`)
        });
    }
}