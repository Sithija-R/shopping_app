import React from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/authContext";
import { useEffect } from "react";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") {
      return;
    }

    const inApp = segments[0] === "appScreens";

    const handleRedirection = () => {
      if (isAuthenticated && !inApp) {
        router.replace("home");
      } else {
        router.replace("signIn");
      }
    };

    handleRedirection();
  }, [isAuthenticated]);

  return <Slot />;
};

export default function _layout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
