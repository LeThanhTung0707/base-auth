"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AuthFieldGroup } from "../molecules/AuthFieldGroup";
import { FormCheckbox } from "../atoms/FormCheckbox";
import { FormButton } from "../atoms/FormButton";
import { AuthFooterLinks } from "../molecules/AuthFooterLinks";
import { AuthLink } from "../atoms/AuthLink";
import { AuthAPI } from "@/lib/auth";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await AuthAPI.login(email, password);
    router.push("/");
  };

  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login into account
        </h2>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="space-y-5">
          <AuthFieldGroup
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
          />

          <div className="flex items-center justify-between text-sm">
            <FormCheckbox
              label="Remember me"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <AuthLink href="#" label="Forget Password?" />
          </div>

          <FormButton text="LOGIN" />

          <AuthFooterLinks mode="login" />
        </form>
      </CardContent>
    </Card>
  );
};
