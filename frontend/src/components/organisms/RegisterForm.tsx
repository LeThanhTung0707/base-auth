"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AuthFieldGroup } from "../molecules/AuthFieldGroup";
import { FormButton } from "../atoms/FormButton";
import { AuthFooterLinks } from "../molecules/AuthFooterLinks";
import { AuthAPI } from "@/lib/auth";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await AuthAPI.register(email, password);
    router.push("/");
  };

  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create a new account
        </h2>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleRegister} className="space-y-5">
          <AuthFieldGroup
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
          />
          <FormButton text="REGISTER" />
          <AuthFooterLinks mode="register" />
        </form>
      </CardContent>
    </Card>
  );
};
