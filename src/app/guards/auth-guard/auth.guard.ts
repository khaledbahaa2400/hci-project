import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth-service/auth.service';

interface RouteData {
  role: string;
  // Add any other properties you might use in route data
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if next.routeConfig is null or undefined
    if (!next.routeConfig?.path) {
      return false; // Prevent access to unknown routes
    }

    // Check if the path is login or register
    if (next.routeConfig.path === 'login' || next.routeConfig.path === 'signup') {
      // If user is authenticated, redirect to their home page
      if (this.authService.isAuthenticated()) {
        const userType = this.authService.getCurrentUser()?.role;
        return this.router.createUrlTree([userType]); // Redirect to type home page
      } else {
        return true; // Allow access to login or register page
      }
    }

    // Check if the user is authenticated
    if (!this.authService.isAuthenticated()) {
      // If not authenticated, redirect to login page
      return this.router.createUrlTree(['/login']);
    }

    // Cast next.data to RouteData to access expectedRole property safely
    const routeData = next.data as RouteData;

    const expectedRole = routeData.role;

    // Check if the user's type matches the expectedRole
    if (this.authService.getCurrentUser()?.role === expectedRole) {
      return true; // Allow access
    } else {
      // If user's type doesn't match, return 403 forbidden
      return this.router.createUrlTree(['/unauthorized']); // Redirect to a forbidden page or show a 403 error
    }
  }
}
