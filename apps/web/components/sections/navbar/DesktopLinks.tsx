import React from "react";
import {NAV_LINKS} from "@/lib/home/NavLinksData";
import {MagneticLink} from "@/components/layout/Navbar";

export const DesktopLinks = () => {
    return (
        <>
            <div className="hidden lg:flex items-center gap-2">
                {NAV_LINKS.map((link) => (
                    <MagneticLink key={link.href} link={link} />
                ))}
            </div>
        </>
    );
};
