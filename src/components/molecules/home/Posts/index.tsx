import React from "react";
import { IPost } from "src/types/post";
import PostCard from "./PostCard";

interface Props {
  posts: IPost[];
  isInGroup?: boolean;
}

const Posts = (props: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {props.posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            id={post.id}
            content={post.content}
            fullName={post.fullName}
            imgUrl={post.imageUrl}
            createdAt={post.createdAt}
            imgUrls={post?.imageUrls}
            shareCount={post?.shareCount}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            hasLike={post.hasLike}
            sharePost={post.sharePost}
            type={post.type}
            userId={post.userId}
            state={post.state}
            group={post.group}
            groupId={post.groupId}
            isInGroup={props.isInGroup}
          />
        );
      })}
    </div>
  );
};

export default Posts;
