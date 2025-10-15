"use client";
import { AuthLink } from "../atoms/AuthLink";

export const AuthFooterLinks = ({ mode }: { mode: "login" | "register" }) => (
  <div className="text-center text-sm mt-4">
    {mode === "login" ? (
      <>
        Don’t have an account?{" "}
        <AuthLink href="/register" label="Register here" />
      </>
    ) : (
      <>
        Already have an account? <AuthLink href="/login" label="Login here" />
      </>
    )}
  </div>
);
