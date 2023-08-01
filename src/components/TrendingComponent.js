import React from 'react'
import { Link } from 'react-router-dom';

function TrendingComponent({blog,onClose}) {
  return (
    <Link to={`detail/${blog.id}`} class="card  text-white my-3" style={{cursor:"pointer"}} onClick={onClose}>
      <img src={blog.image.imageUrl} class="card-img" alt="..." />
      <div class="card-img-overlay">
        <h6 class="card-title">{blog.Title}</h6>
        <p class="card-text"></p>
        <p class="card-text">{blog.timestamp.toDate().toDateString()}</p>
      </div>
    </Link>
  );
}

export default TrendingComponent