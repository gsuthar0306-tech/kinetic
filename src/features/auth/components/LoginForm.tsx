import { useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getStoredAccounts, type StoredAccount } from "../authStorage";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();
    const password = String(formData.get("password") ?? "");

    const accounts: StoredAccount[] = getStoredAccounts();

    const account = accounts.find(
      (a) => a.email === email && a.password === password,
    );

    if (!account) {
      setError("We couldn't find an account with that email and password.");
      return;
    }

    localStorage.setItem(
      "kinetic-session",
      JSON.stringify({ name: account.name, email: account.email }),
    );

    toast.success("Signed in successfully!", {
      description: `Welcome back, ${account.name}.`,
    });

    navigate("/");
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup className="lg:gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            CONNECT TO{" "}
            <span className="text-sm font-black tracking-[0.16em]">
              KINETIC
            </span>
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Sign in to KINETIC
          </h1>
          <p className="text-sm leading-6 text-slate-500">
            Enter your details to access your KINETIC account.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </Field>
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        <Field>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
          >
            Sign in
          </Button>
        </Field>
        <p className="text-center text-sm text-slate-500">
          New to KINETIC?{" "}
          <NavLink
            to="/register"
            className="font-semibold text-slate-950 underline underline-offset-4"
          >
            Create an account
          </NavLink>
        </p>
      </FieldGroup>
    </form>
  );
}
