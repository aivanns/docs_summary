import React from "react";

export const AuthBackground = () => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00C1A0] dark:bg-[#007A6D] rounded-full blur-[128px] opacity-[0.15]" />
      <div className="absolute top-20 right-20 w-[350px] h-[350px] bg-[#6C7281] dark:bg-[#4B545D] rounded-full blur-[128px] opacity-[0.1]" />
      <div className="absolute bottom-20 left-20 w-[350px] h-[350px] bg-[#6C7281] dark:bg-[#4B545D] rounded-full blur-[128px] opacity-[0.1]" />
    </>
  );
};
