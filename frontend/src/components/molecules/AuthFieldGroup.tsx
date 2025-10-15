"use client";
import { FormInput } from "../atoms/FormInput";

interface Props {
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
}

export const AuthFieldGroup = ({
  email,
  password,
  setEmail,
  setPassword,
}: Props) => (
  <div className="space-y-4">
    <FormInput
      label="Email Address"
      type="email"
      value={email}
      placeholder="Enter your email"
      onChange={(e) => setEmail(e.target.value)}
    />
    <FormInput
      label="Password"
      type="password"
      value={password}
      placeholder="Enter your password"
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
);
