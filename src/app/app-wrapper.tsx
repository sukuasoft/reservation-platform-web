"use client";
import useApi from "@/hooks/api";
import { useApp } from "@/hooks/app";
import { init } from "next/dist/compiled/webpack/webpack";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import SplashScreen from "@/components/splash-screen";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

interface AppWrapperProps {
  children: React.ReactNode;
  needAuth?: boolean;
}

export default function AppWrapper({
  children,
  needAuth = true,
}: AppWrapperProps) {
  const { get } = useApi();
  const { setUser, user, setToken } = useApp();
  const [initialized, setInitialized] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  async function initializing() {
    if (user) {
      setInitialized(true);

      if (!needAuth) {
        router.push("/home");
      }
      return;
    }

    const data = await get("/me");

    if (data.status == 200) {
      setUser({
        name: data.data.name,
        email: data.data.email,
        type: data.data.type,
        nif: data.data.nif,
      });

      if (!needAuth) {
        router.push("/home");
      }
    } else {
      if (needAuth) {
        router.push("/register");
      }
    }

    //  toast.error('Houve um problema ao inicializar');
    setInitialized(true);
  }

  useEffect(() => {
    if (!initialized) {
      initializing();
    }
  }, []);

  return (
    <div>
      {!initialized && <SplashScreen />}

      {initialized && (
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
