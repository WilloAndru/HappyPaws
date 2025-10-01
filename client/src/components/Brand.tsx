import { Link } from "react-router-dom";

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img className="w-12" src="/icon.png" alt="Icon" />
      <h1 className="hidden md:flex">HappyPaws</h1>
    </Link>
  );
}

export default Brand;
