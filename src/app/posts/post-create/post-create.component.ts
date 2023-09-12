import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{
    // newPost = 'NO Content';
    enteredtitle = "";
    enteredContent = "";
    // @Output() postCreated= new EventEmitter<Post>();

    constructor(private postsService: PostsService){}

    onAddPost(form: NgForm){
        if(form.invalid){
            return;
        }
        const post= {
            title: form.value.title,
            content: form.value.content
        };
        this.postsService.addPost(form.value.title, form.value.content);   
        form.resetForm();
    }
}