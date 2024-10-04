import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { Post } from "../../post.entity";

export class GetAllPostsResponse extends BaseResponse{
    public posts: Post[] = [];
}