import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private router: Router) { }

  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }
 
  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public login(token: string) {
    this.setToken(token);
    this.router.navigate(["/panel"]);
  }

  public logout() {
    window.sessionStorage.clear();
    this.router.navigate(["/login"]);
  }

  private decodePayload(token: string | null): any {
    if (!token) {
      return null;
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        return null;
      }

      const payload = parts[1];
      if (!payload) {
        return null;
      }

      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = atob(base64);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
 
  public getIdUsuario(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values?.sub || "";
    }
    return "";
  }
 
  public getRol(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values?.rol || "";
    }
    return "";
  }

  public getEstado(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values?.estado || "";
    }
    return "";
  }

  public getNombre(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values?.nombre || "";
    }
    return "";
  }

  public getEmail(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values?.email || "";
    }
    return "";
  }

  public isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }

    const values = this.decodePayload(token);
    if (!values || !values.exp) {
      return true;
    }

    const expirationDate = new Date(values.exp * 1000);
    return expirationDate < new Date();
  }
}