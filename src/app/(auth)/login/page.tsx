import Image from "next/image";

import { AuthForm } from "@/components/auth/auth-form";
import { Container } from "@/components/common/Container";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <AuthForm mode="login" />
      <Container className="relative mx-0 h-screen w-1/2">
        <Image
          fill
          alt="Image"
          src={"/assets/login.jpg"}
          className="object-cover object-top"
        />
      </Container>
    </main>
  );
}
