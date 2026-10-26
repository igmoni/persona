import React from "react";

import { ProfileCard } from "@/components/profile/profile-card";

const page = () => {
  return (
    <div className="h-screen w-full">
      <div className="m-auto">
        <ProfileCard />
      </div>
    </div>
  );
};

export default page;
