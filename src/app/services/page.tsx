"use client";

import AppWrapper from "../app-wrapper";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useApp } from "@/hooks/app";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ServicesServiceProvider from "./serviceProvider";

export default function Services() {
  const { user } = useApp();
  const router = useRouter();
  useEffect(() => {
    if (user && user.type == "client") {
      router.push("/home");
    }
  }, [user]);
  return (
    <AppWrapper>
      <div className="h-screen w-full flex flex-col">
        <Navbar />
        <div className="flex-1 flex ">
          <Sidebar page="services" />
          <div className="px-4 py-6">
            <ServicesServiceProvider />
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}
