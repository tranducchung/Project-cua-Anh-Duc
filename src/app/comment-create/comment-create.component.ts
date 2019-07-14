import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Comment} from '../comment';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {
  comments: Comment[] = [];

  postForm: FormGroup;
  constructor(
    private postService: PostService,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  onSubmit() {
    if (this.postForm.valid) {
      const {value} = this.postForm;
      this.postService.createComment(value)
        .subscribe(next => {
          this.comments.unshift(next);
          this.postForm.reset({
            name: '',
            email: '',
            body: ''
          });
        }, error => console.log(error));
    }
  }
}
