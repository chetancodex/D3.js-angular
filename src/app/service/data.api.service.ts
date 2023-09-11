import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Data } from "../interfaces/data.interface";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DataService {
  globalData!: Observable<{data : Data[]}>;

  constructor(private http: HttpClient) {
    this.globalData = this.http.get<{data : Data[]}>('http://localhost:3360/get');
  }
}
