import { IconType } from "react-icons";
import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaLocationDot,
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

export interface ContactHeaderData {
  title: string;
  subtitle: string;
}

export interface ContactInfoItem {
  icon: IconType;
  label: string;
  value: string;
  link: string;
  color: string;
}

export interface SocialItem {
  name: string;
  href: string;
  icon: IconType;
  color: string;
  glow: string;
  borderColor: string;
  shadowColor: string;
}

export const contactHeaderData: ContactHeaderData = {
  title: "Contact Information",
  subtitle: "Feel free to connect through any of these platforms.",
};

export const contactInfoData: ContactInfoItem[] = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "biswanath.sarker.bd@gmail.com",
    link: "mailto:biswanath.sarker.bd@gmail.com",
    color: "text-red-400",
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: "+880 1628 284848",
    link: "tel:+8801628284848",
    color: "text-green-400",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+880 1628 284848",
    link: "https://wa.me/8801628284848",
    color: "text-green-500",
  },
  {
    icon: FaLocationDot,
    label: "Location",
    value: "Dhaka, Bangladesh",
    link: "#",
    color: "text-blue-400",
  },
];

export const socialsData: SocialItem[] = [
  {
    name: "GitHub",
    href: "https://github.com/BiswanathBD",
    icon: FaGithub,
    color: "hover:text-white",
    glow: "from-white/20 to-white/20",
    borderColor: "group-hover:border-white/50",
    shadowColor: "group-hover:shadow-white/20",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/biswanath-sarker-bd/",
    icon: FaLinkedinIn,
    color: "hover:text-blue-400",
    glow: "from-blue-400/20 to-blue-500/20",
    borderColor: "group-hover:border-blue-400/50",
    shadowColor: "group-hover:shadow-blue-400/20",
  },
  {
    name: "Facebook",
    href: "https://web.facebook.com/Biswanath.Sarker.BD",
    icon: FaFacebookF,
    color: "hover:text-blue-500",
    glow: "from-blue-500/20 to-blue-600/20",
    borderColor: "group-hover:border-blue-500/50",
    shadowColor: "group-hover:shadow-blue-500/20",
  },
  {
    name: "Twitter",
    href: "https://x.com/Biswanath08BD",
    icon: FaXTwitter,
    color: "hover:text-sky-400",
    glow: "from-sky-400/20 to-sky-500/20",
    borderColor: "group-hover:border-sky-400/50",
    shadowColor: "group-hover:shadow-sky-400/20",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/biswanath.sarker.bd/",
    icon: FaInstagram,
    color: "hover:text-pink-400",
    glow: "from-pink-400/20 to-purple-500/20",
    borderColor: "group-hover:border-pink-400/50",
    shadowColor: "group-hover:shadow-pink-400/20",
  },
];
