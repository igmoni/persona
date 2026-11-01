import type { ReactNode } from "react";

type PersonaPhoneFrameProps = {
  children: ReactNode;
};

export const PersonaPhoneFrame = ({ children }: PersonaPhoneFrameProps) => {
  return (
    <div className="mx-auto w-full max-w-[390px] rounded-[42px] border-[9px] border-black bg-black p-[3px] shadow-2xl">
      <div className="relative min-h-[720px] overflow-hidden rounded-[32px] bg-white">
        {/* Dynamic island */}
        <div className="absolute top-3 left-1/2 z-20 h-6 w-[108px] -translate-x-1/2 rounded-full bg-black" />

        <div className="min-h-[720px]">{children}</div>
      </div>
    </div>
  );
};
