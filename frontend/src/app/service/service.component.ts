import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  foodTypeRes;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  getFoodType(body) {
    var headers = new HttpHeaders();
    headers.append("Content-Type", "application/json")
    var options = { "headers": headers }

    return this.http.post('http://127.0.0.1:5000/restaurant/1', body, options)
 

  }



}
