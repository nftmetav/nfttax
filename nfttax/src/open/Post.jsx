import React, { useEffect } from "react";
import { useParams } from "react-router";

export default function Post() {
  let { postId } = useParams();

  useEffect(() => {
    // Fetch post using the postId
  }, [postId]);

  return (
    <div className="post">
      <div className="container text-white px-6">
        <h1 className="mt-5">This is a Post Title</h1>
        <h6 className="mb-5">The post id is, {postId}</h6>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
}
