import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-zinc-600 flex justify-between px-8 py-2">
      <h1>Awesome Shoutout Animations</h1>
      <ul className="flex">
        <li className="mx-4 hover:text-white">
          <Link to="/">Home</Link>
        </li>
        <li className="mx-2 hover:text-white">
          <Link to="/new">Upload animation</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
