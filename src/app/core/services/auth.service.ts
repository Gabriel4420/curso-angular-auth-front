import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, catchError, map, throwError } from 'rxjs'
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:3000'
  constructor(private http: HttpClient, private router: Router) {}

  public sign(payload: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.url}/sign`, payload).pipe(
      map((data: any) => {
        localStorage.removeItem('access_token')
        localStorage.setItem('access_token', data.token)
        return this.router.navigate(['admin'])
      }),
      catchError((error: any) => {
        if (error.error.message) return throwError(() => error.error.message)
        return throwError(
          () => 'Erro ao validar os dados! Tente novamente mais tarde',
        )
      }),
    )
  }

  public logout() {
    localStorage.removeItem('access_token')
    return this.router.navigate([''])
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token')
    let jwtHelper;
    return !token ? false : (jwtHelper = new JwtHelperService(),!jwtHelper.isTokenExpired(token) )
  }
}
