import {
  ArrowDownToLine,
  ChartSpline,
  Globe,
  Settings,
  SquarePen,
} from "lucide-react";

export const sidebarLinks = [
  { id: 1, title: "Dashboard", href: "/dashboard", icon: <SquarePen /> },
  {
    id: 2,
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <ChartSpline />,
  },
  {
    id: 3,
    title: "Downloads",
    href: "/dashboard/downloads",
    icon: <ArrowDownToLine />,
  },
  { id: 4, title: "Domain", href: "/dashboard/domain", icon: <Globe /> },
  {
    id: 5,
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings />,
  },
];
