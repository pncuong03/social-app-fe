import React from "react";
import PostCard from "./PostCard/PostCard";
import { IPost } from "src/types/post";

interface Props {
  posts: IPost[];
}

const Posts = (props: Props) => {
  const sortedPosts = props.posts.slice().sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="flex flex-col gap-3">
      {sortedPosts.map((post) => {
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
          />
        );
      })}
    </div>
  );
};

export default Posts;
