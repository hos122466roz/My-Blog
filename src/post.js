import { format } from "date-fns";
import { Link } from "react-router-dom";
const Post = ({_id, title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/" + cover} alt="description of image" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author" href="#">
            {author.username}
          </a>
          <time>{format(new Date(createdAt), "yyyy-MM-dd HH:mm")}</time>
        </p>
        <p className="summary ">{summary}</p>
      </div>
    </div>
  );
};
export default Post;
