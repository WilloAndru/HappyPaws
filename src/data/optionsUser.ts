import { IconType } from "react-icons";
import { FaUser, FaBoxOpen, FaStar, FaSignOutAlt } from "react-icons/fa";

export type OptionsUser = {
  label: string;
  href?: string;
  icon: IconType;
};

export const optionsUser: OptionsUser[] = [
  {
    label: "Profile",
    href: "/profile",
    icon: FaUser,
  },
  {
    label: "Orders",
    href: "/profile/orders",
    icon: FaBoxOpen,
  },
  {
    label: "Wishlist",
    href: "/profile/wishlist",
    icon: FaStar,
  },
  {
    label: "Sign Out",
    icon: FaSignOutAlt,
  },
];
