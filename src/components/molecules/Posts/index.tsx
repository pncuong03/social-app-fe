import React from "react";
import PostCard from "./PostCard/PostCard";

const Posts = () => {
  const posts = [
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      imgUrl: "https://picsum.photos/200/300",
      likeCount: "100",
      commentCount: "200",
      shareCount: "300",
      username: "John Doe",
      time: "1h",
      imgUrls: "https://picsum.photos/200/300",
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      imgUrl: "https://picsum.photos/200/300",
      likeCount: "100",
      commentCount: "200",
      shareCount: "300",
      username: "John Doe",
      time: "1h",
      imgUrls: "https://picsum.photos/200/300",
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      imgUrl: "https://picsum.photos/200/300",
      likeCount: "100",
      commentCount: "200",
      shareCount: "300",
      username: "John Doe",
      time: "1h",
      imgUrls: "https://picsum.photos/200/300",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post, index) => {
        return (
          <PostCard
            key={index}
            content={post.content}
            fullName={post.username}
            imgUrl={post.imgUrl}
            createdAt={post.time}
            imgUrls={post.imgUrls}
            shareCount={post.shareCount}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
          />
        );
      })}
    </div>
  );
};

export default Posts;
