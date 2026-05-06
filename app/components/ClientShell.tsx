'use client';

import Navbar from "./Navbar";
import CustomCursor from "./CustomCursor";
import BgMusic from "./BgMusic";

export default function ClientShell() {
  return (
    <>
      <CustomCursor />
      <div className="scanlines" />
      <BgMusic />
      <Navbar />
    </>
  );
}
