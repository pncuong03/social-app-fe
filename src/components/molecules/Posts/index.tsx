import React, { useEffect } from "react";
import PostCard from "./PostCard/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/app/store";
import { fetchPostPublic } from "src/slices/posts/postSlice";

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
      imgUrls: ["https://picsum.photos/200/300"],
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      imgUrl: "https://picsum.photos/200/300",
      likeCount: "100",
      commentCount: "200",
      shareCount: "300",
      username: "John Doe",
      time: "1h",
      imgUrls: ["https://picsum.photos/200/300"],
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      imgUrl: "https://picsum.photos/200/300",
      likeCount: "100",
      commentCount: "200",
      shareCount: "300",
      username: "John Doe",
      time: "1h",
      imgUrls: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"],
      isShare: {
        content: "asdasdasdasdasas",
        imgUrl: "https://picsum.photos/200/300",
        username: "Cuong",
        time: "1h",
        imgUrls: ["https://picsum.photos/200/300"],
      },
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const postPublic = useSelector((state: RootState) => state.post.postOfPublic);

  console.log(postPublic);

  useEffect(() => {
    dispatch(fetchPostPublic());
  }, [dispatch]);

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
            isShare={post.isShare}
          />
        );
      })}
    </div>
  );
};

export default Posts;
