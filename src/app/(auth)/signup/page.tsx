import Image from "next/image";

import { AuthForm } from "@/components/auth/auth-form";
import { Container } from "@/components/common/Container";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Container className="relative mx-0 h-screen w-1/2">
        <Image
          fill
          alt="Image"
          src={"/assets/login.jpeg"}
          className="object-cover object-top"
        />
      </Container>
      <AuthForm mode="signup" />
    </main>
  );
}
