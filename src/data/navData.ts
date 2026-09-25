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
  route: string;
  section: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/#home",
    route: "/",
    section: "home",
    icon: Home,
  },
  {
    name: "About",
    href: "/#about",
    route: "/",
    section: "about",
    icon: User,
  },
  {
    name: "Education",
    href: "/#education",
    route: "/",
    section: "education",
    icon: GraduationCap,
  },
  {
    name: "Skills",
    href: "/#skills",
    route: "/",
    section: "skills",
    icon: Code2,
  },
  {
    name: "Projects",
    href: "/#projects",
    route: "/projects",
    section: "projects",
    icon: FolderGit2,
  },
  {
    name: "Contact",
    href: "/#contact",
    route: "/",
    section: "contact",
    icon: Mail,
  },
];
