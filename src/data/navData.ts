import {
  Home,
  User,
  GraduationCap,
  Code2,
  FolderGit2,
  Mail,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  section: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/#",
    section: "home",
    icon: Home,
  },
  {
    name: "About",
    href: "/#about",
    section: "about",
    icon: User,
  },
  {
    name: "Education",
    href: "/#education",
    section: "education",
    icon: GraduationCap,
  },
  {
    name: "Skills",
    href: "/#skills",
    section: "skills",
    icon: Code2,
  },
  {
    name: "Projects",
    href: "/#projects",
    section: "projects",
    icon: FolderGit2,
  },
  {
    name: "Contact",
    href: "/#contact",
    section: "contact",
    icon: Mail,
  },
];
