"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Section } from "@/components/craft";

import { ModeToggle } from "../darklight";

const navigation = [
  { name: "Heros", href: "/hero" },
  { name: "Features", href: "/feature" },
  { name: "CTAs", href: "/cta" },
  { name: "FAQs", href: "/faq" },
  { name: "Pricing", href: "/pricing" },
  { name: "Headers", href: "/header" },
  { name: "Footers", href: "/footer" },
];

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY < lastScrollY);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
<Section
  className={`sticky top-4 z-50 left-0 right-0 mx-auto max-w-6xl rounded-lg border bg-background transition-transform duration-300 not-prose px-4 flex items-center justify-between h-5 ${showNavbar ? "translate-y-0" : "-translate-y-[200%]"}`}
>


  <h1 className="ml-2">
    <Link href="/">
      <span className="text-orange-500">Book</span>.Hub
    </Link>
  </h1>

  <div className="flex items-center gap-8">
    {/* Desktop Nav */}
    <div className="hidden md:flex items-center gap-4 text-sm">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-primary/80 transition-all hover:-mt-px hover:mb-px hover:text-primary"
        >
          {item.name}
        </Link>
      ))}
    </div>

    {/* Right Actions */}
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <ModeToggle />

      {/* GitHub */}
      <Button variant="outline" size="icon" asChild className="h-10 w-10">
        <Link href="https://github.com/brijr/components" target="_blank">
          <Github className="h-4 w-4" />
        </Link>
      </Button>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-6">
          <div className="flex flex-col gap-4 mt-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm text-primary/80 hover:text-primary">
                {item.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</Section>

  );
}
