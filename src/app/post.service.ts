import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPost} from './post';
import {Comment} from './comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API_URL = 'http://jsonplaceholder.typicode.com/posts';
  private readonly API_URL2 = 'http://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.API_URL);
  }

  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.API_URL}/${id}`);
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.http.post<IPost>(this.API_URL, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${this.API_URL}/${post.id}`, post);
  }
// comments
  getCommentsByPostId(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.API_URL2}?postId=${id}`);
  }
  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.API_URL2}/${id}`);
  }
  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL2}/${id}`);
  }
  createComment(comment: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(this.API_URL2, comment);
  }
  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.API_URL2}/${comment.id}`, comment);
  }
}
