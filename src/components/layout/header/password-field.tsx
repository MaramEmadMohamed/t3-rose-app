"use client";

import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { LOGIN_INPUT_CLASS_NAME } from "./login-field-styles";

export function PasswordField({ id }: { id: string }) {
  // Translation
  const t = useTranslations("Header");

  // State
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Functions
  function togglePasswordVisibility() {
    setIsPasswordVisible((isVisible) => !isVisible);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id}>{t("password")}</label>
      <div className="relative">
        <input
          id={id}
          type={isPasswordVisible ? "text" : "password"}
          autoComplete="current-password"
          placeholder={t("passwordPlaceholder")}
          className={cn(LOGIN_INPUT_CLASS_NAME, "pe-12")}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          aria-label={isPasswordVisible ? t("hidePassword") : t("showPassword")}
          className="absolute inset-y-0 end-0 flex items-center px-4 text-zinc-400 hover:text-zinc-600"
        >
          {isPasswordVisible ? (
            <Eye aria-hidden="true" className="size-5" />
          ) : (
            <EyeOff aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>
    </div>
  );
}
