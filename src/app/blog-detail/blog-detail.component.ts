import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { IPost } from '../post';
import { Comment} from '../comment';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  post: IPost;
  comments: Comment[];
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(id).subscribe(
      next => {
        this.post = next;
        this.postService.getCommentsByPostId(id).subscribe( comments => {
          // @ts-ignore
          this.comments = comments;
        });
      },
      error => {
        console.log(error);
        this.post = null;
      }
    );
  }
  deleteComment(i) {
    const comment = this.comments[i];
    this.postService.deleteComment(comment.id).subscribe(() => {
      this.comments = this.comments.filter(t => t.id !== comment.id);
    });
  }
}


