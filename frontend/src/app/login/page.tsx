"use client"

import { LoginForm } from "@/shared/components/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-muted">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="bg-background relative hidden lg:flex items-center justify-center">
        <Image
          width={750}
          height={750}
          src="/assets/logo.png"
          alt="Image"
        />
      </div>
    </div>
  )
}
