import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title: 'First Post', content: 'This is first post\'s content'},
  //   {title: 'Second Post', content: 'This is Second post\'s content'},
  //   {title: 'Third Post', content: 'This is Third post\'s content'}
  // ]

  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postService: PostsService){}

  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener().
    subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
