import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPost } from '../../shared/model/blog.model';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';

@Injectable({providedIn: 'root'})
export class PostService {

    resourceUrl: string = SERVER_API_URL + '/posts';

    constructor(private http: HttpClient) {
    }

    query(query: any): Observable<IPost[]> {
       return this.http.get<IPost[]>(`${this.resourceUrl}`, { params: query });
    }

    /* 
    We don't really need these for this exercise but typically 
    we would access those from a server but for now we'll just access those from
    the store.
    */
    get(id: number): Observable<IPost> {
        return this.http.get<IPost>(`${this.resourceUrl}/${id}`);
    }

    create(post: IPost): Observable<IPost> {
        return this.http.post<IPost>(`${this.resourceUrl}`, post);
    }

    update(post: IPost): Observable<IPost> {
        return this.http.put<IPost>(`${this.resourceUrl}/${post.id}`, post);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }    
}



