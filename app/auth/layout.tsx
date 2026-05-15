import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className=" min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden lg:block">
          <div className="panel relative overflow-hidden px-10 py-14">
            <div className="absolute inset-x-8 top-0 h-40 rounded-b-full bg-[radial-gradient(circle,rgba(255,255,255,0.75),transparent_70%)]" />
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">
              AI Interview Studio
            </p>
            <h1 className="font-[family-name:var(--font-montagu-slab)] text-5xl leading-tight text-foreground">
              Train with sharper mock interviews that feel structured and focused.
            </h1>
            <p className="mt-6  text-lg leading-8 text-foreground/70">
              Practice technical and behavioral rounds, review your performance,
              and keep everything in one workspace designed to feel calm and
              deliberate.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 ">
              <div className="rounded-[1.5rem] border border-primary/10 bg-white/60 p-4">
                <p className="text-3xl font-semibold text-primary">24/7</p>
                <p className="mt-2 text-sm text-foreground/65">Practice whenever you need a rep.</p>
              </div>
              <div className="rounded-[1.5rem] border border-primary/10 bg-white/60 p-4">
                <p className="text-3xl font-semibold text-primary">AI</p>
                <p className="mt-2 text-sm text-foreground/65">Mock rounds tailored to the role.</p>
              </div>
              <div className="rounded-[1.5rem] border border-primary/10 bg-white/60 p-4">
                <p className="text-3xl font-semibold text-primary">Fast</p>
                <p className="mt-2 text-sm text-foreground/65">Get feedback without waiting on recruiters.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex justify-center">{children}</section>
      </div>
    </main>
  );
};

export default AuthLayout;
