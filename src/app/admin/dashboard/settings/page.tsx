"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateCredentialsAction, logoutAction } from "@/app/actions";
import { AnimatedContainer } from "@/components/animated-container";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" disabled={pending}>
            {pending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
        </Button>
    );
}

export default function SettingsPage() {
  const [state, formAction] = useActionState(updateCredentialsAction, { message: "", success: false });
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: state.message,
      });
    }
    if (state.message && state.success) {
        toast({
            title: "Success",
            description: state.message,
        });
        // Log out the user so they have to log in with new credentials
        setTimeout(() => {
            logoutAction();
        }, 2000);
    }
  }, [state, toast]);

  return (
    <AnimatedContainer>
        <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Change Credentials</CardTitle>
            <CardDescription>Update the admin username and password.</CardDescription>
        </CardHeader>
        <CardContent>
            <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="username">New Username</Label>
                <Input id="username" name="username" type="text" placeholder="newadmin" required />
                {state.errors?.username && <p className="text-sm text-destructive">{state.errors.username.join(", ")}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input id="password" name="password" type="password" required />
                 {state.errors?.password && <p className="text-sm text-destructive">{state.errors.password.join(", ")}</p>}
            </div>
            <SubmitButton />
            </form>
        </CardContent>
        </Card>
    </AnimatedContainer>
  );
}
