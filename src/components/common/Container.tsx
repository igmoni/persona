import { cn } from "cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <section className={cn("mx-auto w-full max-w-4xl", className)}>
      {children}
    </section>
  );
};

export { Container };
