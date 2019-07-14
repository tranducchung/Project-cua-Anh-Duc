import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../post.service';
import {Comment} from '../comment';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent implements OnInit {
  comment: Comment;
  postForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getCommentById(id).subscribe(
      next => {
        this.comment = next;
        this.postForm.patchValue(this.comment);
      },
      error => {
        console.log(error);
        this.comment = null;
      }
    );
  }
  onSubmit() {
    if (this.postForm.valid) {
      const { value } = this.postForm;
      const data = {
        ...this.comment,
        ...value
      };
      this.postService.updateComment(data).subscribe(
        next => {
          console.log('edit comment success');
          console.log(next);
          this.router.navigate(['/blog']);
        },
        error => console.log(error)
      );
    }
  }


}
