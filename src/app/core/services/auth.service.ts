import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, map, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:3000'
  constructor(private http: HttpClient) {}

  public sign(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.url}/sign`, payload).pipe(
      map((data: any) => {
        return console.log(data)
      }),
      catchError((error: any) => {
        console.log(error)
        return throwError(() => error)
      }),
    )
  }
}
