import { FaPhoneAlt } from "react-icons/fa";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagramSquare,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="text-white bg-primary flex items-center p-4 justify-around">
        <h6 className="hidden md:block">Our experts are available 24/7</h6>
        <button className="hidden md:flex justify-center items-center gap-2 rounded-3xl hover:bg-primary-hover px-4 py-2">
          <FaPhoneAlt className="text-2xl" />
          <h6>+57 302 5177000</h6>
        </button>
        <button className="flex justify-center items-center gap-2 rounded-3xl hover:bg-primary-hover px-4 py-2">
          <IoChatbubblesSharp className="text-2xl" />
          <h6>Chat now</h6>
        </button>
        <button className="flex justify-center items-center gap-2 rounded-full bg-white text-primary px-6 py-2 hover:bg-blue-500">
          <FaArrowUp />
          <h6>Back to Top</h6>
        </button>
      </div>
      <div className="flex items-center px-8 py-4 justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <p>Copyright @ 2025</p>
          <Link href="/" className="hover:text-gray-500">
            Terms
          </Link>
          <Link href="/" className="hover:text-gray-500">
            Privacy
          </Link>
          <Link href="/" className="hover:text-gray-500">
            Accessibility
          </Link>
          <Link href="/" className="hover:text-gray-500">
            About us
          </Link>
          <Link href="/" className="hover:text-gray-500">
            Jobs
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-4 text-4xl">
          <FaFacebook className="text-blue-500" />
          <FaYoutube className="text-red-500" />
          <FaInstagramSquare className="text-pink-500" />
          <FaTiktok />
        </div>
      </div>
    </footer>
  );
}
