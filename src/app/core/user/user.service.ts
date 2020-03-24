import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { IUser } from '../../shared/model/user.model';


@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = SERVER_API_URL + '/users';

  constructor(private http: HttpClient) { }

  query(req?: any): Observable<IUser[]> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl, { params: options });
  }

  /* 
   We don't really need these for this exercise but typically 
   we would access those from a server but for now we'll just access those from
   the store.
  */
  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.resourceUrl, user, {});
  }

  update(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.resourceUrl, user, {});
  }

  find(login: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.resourceUrl}/${login}`, {});
  }


}
