import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { IPost } from '../post';
import { Comment} from '../comment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  post: IPost;
  comments: Comment[];
  comment: Comment;

  commentForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(id).subscribe(
      next => {
        this.post = next;
      },
      error => {
        console.log(error);
        this.post = null;
      }
    );
    this.postService.getAllComment().subscribe(data => {
      this.comments = data;
    });
  }
  onSubmit() {
    if (this.commentForm.valid) {
      const {value} = this.commentForm;
      const data = {
        ...this.comment,
        ...value
      };
      this.postService.createComment(data)
        .subscribe(next => {
          console.log('create Comment success');
          console.log(next);
          this.comments.unshift(next);
          this.commentForm.reset({
            name: '',
            email: '',
            body: ''
          });
        }, error => console.log(error));
    }
  }
  deleteComment(i) {
    const comment = this.comments[i];
    this.postService.deleteComment(comment.id).subscribe(() => {
      this.comments = this.comments.filter(t => t.id !== comment.id);
    });
  }
}


