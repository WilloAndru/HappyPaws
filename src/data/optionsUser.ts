import { IconType } from "react-icons";
import { FaUser, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

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
    href: "/orders",
    icon: FaBoxOpen,
  },
  {
    label: "Configuration",
    href: "/configuration",
    icon: IoMdSettings,
  },
  {
    label: "Sign Out",
    icon: FaSignOutAlt,
  },
];
