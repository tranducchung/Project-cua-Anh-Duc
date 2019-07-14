import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlogComponent} from './blog/blog.component';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';
import {BlogEditComponent} from './blog-edit/blog-edit.component';
import {CommentDetailComponent} from './comment-detail/comment-detail.component';
import {CommentEditComponent} from './comment-edit/comment-edit.component';

const routes: Routes = [{
  path: 'blog',
  component: BlogComponent
},
  {
    path: 'blog/:id',
    component: BlogDetailComponent
  },
  {
    path: 'blog/:id/edit',
    component: BlogEditComponent
  },
  {
    path: 'comment/:id',
    component: CommentDetailComponent
  },
  {
    path: 'comment/:id/edit',
    component: CommentEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
