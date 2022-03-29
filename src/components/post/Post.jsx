import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {

  return (
    <div className="post">
      {post.photo ? (<img
        className="postImg"
        src={process.env.REACT_APP_PF + post.photo}
        alt=""
      />) : 
      (<img
        className="postImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />)
      }
      <div className="postInfo">
        <div className="postCats">
        {post.categories.map((c) => (
            <span className="postCat" key={c.name}>{c.name}</span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
      {post.desc}
      </p>
    </div>
  );
}
