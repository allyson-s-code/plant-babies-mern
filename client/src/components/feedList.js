import React from "react";
import Plant from "./plant";

const FeedList = () => (
  <div className="feed-list">
    <h2>Feed Me!</h2>
    <ul className="feed-list__plants">
      <Plant />
      <Plant />
    </ul>
  </div>
);

export default FeedList;
