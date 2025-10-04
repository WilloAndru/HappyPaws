import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Brand from "./Brand";

function Footer() {
  return (
    <footer className="flex flex-col gap-4 p-8 border-t border-t-neutral-600 bg-white">
      {/* Links aburridos */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <Link className="link" to="/">
            Locations
          </Link>
          <Link className="link" to="/">
            Work with us
          </Link>
          <Link className="link" to="/">
            Privacy Policy
          </Link>
          <Link className="link" to="/">
            Terms and Conditions
          </Link>
        </div>
        <Brand />
      </div>
      {/* Redes Sociales */}
      <div className="flex justify-between">
        <p>2025 HappyPaws</p>
        <div className="flex gap-4 text-2xl">
          <Link className="link" to="/">
            <FaInstagram />
          </Link>
          <Link className="link" to="/">
            <FaFacebook />
          </Link>
          <Link className="link" to="/">
            <FaYoutube />
          </Link>
          <Link className="link" to="/">
            <FaSquareXTwitter />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
