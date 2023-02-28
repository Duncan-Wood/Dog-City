import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/breeds">Breeds</Link>
      {/* Write a function to pull a random breed using index 1-172 */}
      <Link to="/breeds/1">Random Breed</Link>
    </div>
  );
}
