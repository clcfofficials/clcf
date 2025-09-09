"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" disabled={pending}>
            {pending ? "Logging in..." : <><LogIn className="mr-2 h-4 w-4" /> Login</>}
        </Button>
    );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, { message: "", success: false });
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
        <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        <p className="text-xs text-muted-foreground pt-2">(Default: admin / admin)</p>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" type="text" placeholder="admin" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
