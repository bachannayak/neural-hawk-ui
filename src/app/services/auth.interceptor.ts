import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  try {
    const authToken = sessionStorage.getItem('auth_token');

    if (authToken) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` }
      });
      return next(authReq);
    } else {
      console.warn('No auth token found, proceeding without authentication.');
    }
  } catch (error) {
    console.error('Error retrieving auth token:', error);
  }

  return next(req);
};

