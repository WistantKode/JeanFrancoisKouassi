import Link from "next/link";
import React from "react";

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center p-0.5 shadow-lg shadow-primary/20">
                <div className="w-full h-full bg-black rounded-[9px] flex items-center justify-center">
                    <span className="text-primary font-black text-lg italic">J</span>
                </div>
            </div>
            <div className="flex flex-col gap-0">
                <span className="text-sm font-black tracking-widest uppercase leading-none">JFK 2025</span>
                <span className="text-[8px] font-black tracking-[0.4em] text-primary/60 uppercase">Emergence</span>
            </div>
        </Link>
    );
};
