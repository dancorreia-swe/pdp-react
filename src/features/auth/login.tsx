import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { useFocus } from "~/hooks/useFocus";
import { ThemeSwitcher } from "~/components/theme-switcher";

export function Login() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const passwordInputRef = useRef<HTMLLabelElement>(null);
  const [revealPassword, setRevealPassword] = useState(false);

  const { isFocused, onFocus, onBlur } = useFocus();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Control" && isFocused) {
      setRevealPassword(true);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Control") {
      setRevealPassword(false);
    }
  };

  useEffect(() => {
    if (!isFocused) {
      setRevealPassword(false);
    }
  }, [isFocused]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Acme Inc account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" ref={passwordInputRef}>
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type={revealPassword ? "text" : "password"}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  required
                />
                <p className="text-xs leading-relaxed opacity-60">
                  Hold <code className="text-xs font-bold">Ctrl</code> to
                  display your password temporarily
                </p>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
