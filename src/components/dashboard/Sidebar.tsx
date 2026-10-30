"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDown, Send } from "lucide-react";
import { motion } from "motion/react";

import { sidebarLinks } from "@/config/sidebar";
import { jetbrainsMono } from "@/lib/font";

import { Logo } from "../common/Logo";
import { UserAvatar } from "../common/user-avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type SidebarProps = {
  profile: {
    name: string;
    email: string;
    avatar: string | null;
  };
};

const Sidebar = ({ profile }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div className="fixed left-0 flex h-screen w-3xs flex-col justify-between border border-r border-neutral-300 bg-neutral-100 p-5">
      <div>
        <Logo />

        <div className="mt-5 flex cursor-pointer items-center justify-between rounded-xl border border-neutral-200/60 bg-white p-1 px-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-neutral-500" />
            <div className="">
              <p className="text-semibold">Mohan S P</p>
              <p
                className={`${jetbrainsMono.className} -mt-1 text-sm text-neutral-700`}
              >
                @igmoni
              </p>
            </div>
          </div>
          <ChevronDown />
        </div>

        <Separator className={"my-2"} />

        <div className="flex flex-col gap-1">
          {sidebarLinks.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                href={item.href}
                key={item.href}
                className="relative flex items-center gap-3 rounded-xl p-2 py-3 pl-3"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-2xl bg-white ring ring-neutral-300"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-2">
                  <span
                    className={`${isActive ? "text-indigo-500" : "text-black"} transition-all duration-300`}
                  >
                    {item.icon}
                  </span>
                  <p>{item.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex w-full flex-col gap-2.5 rounded-2xl bg-white p-4">
          <div className="flex w-fit items-center gap-1 rounded-full bg-neutral-300/50 p-0.5 px-2.5">
            <span className="size-2 rounded-full bg-neutral-500" />
            <span className="">Draft</span>
          </div>
          <p className="text-sm">Only you can see this page.</p>
          <Button className={"flex gap-2 rounded-full py-5 text-sm"}>
            <Send />
            Publish from $49/yr
          </Button>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <UserAvatar name={profile.name} avatar={profile.avatar} />
          <p className="text-sm">{profile.email}</p>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
