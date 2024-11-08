export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Image-Wizard 📸🧙‍♂️",
  description: "API para manipulação e edição de imagens.",
  navItems: [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Sobre o projeto",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/vhratts/image-wizard",
  },
};
