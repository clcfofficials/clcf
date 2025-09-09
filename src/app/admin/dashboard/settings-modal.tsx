
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, KeyRound, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateUsernameAction, updatePasswordAction, logoutAction } from "@/app/actions";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SubmitButton({ text }: { text: string }) {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full mt-2" disabled={pending}>
            {pending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> {text}</>}
        </Button>
    );
}


function UpdateUsernameForm() {
  const [state, formAction] = useActionState(updateUsernameAction, { message: "", success: false });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        variant: state.success ? "default" : "destructive",
        title: state.success ? "Success" : "Update Failed",
        description: state.message,
      });
      if(state.success) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="newUsername">New Username</Label>
            <Input id="newUsername" name="newUsername" type="text" placeholder="newadmin" required />
            {state.errors?.newUsername && <p className="text-sm text-destructive">{state.errors.newUsername.join(", ")}</p>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="currentPasswordUser">Current Password</Label>
            <Input id="currentPasswordUser" name="currentPassword" type="password" required />
             {state.errors?.currentPassword && <p className="text-sm text-destructive">{state.errors.currentPassword.join(", ")}</p>}
        </div>
        <SubmitButton text="Update Username" />
    </form>
  )
}

function UpdatePasswordForm() {
  const [state, formAction] = useActionState(updatePasswordAction, { message: "", success: false });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if (state.message) {
      toast({
        variant: state.success ? "default" : "destructive",
        title: state.success ? "Success" : "Update Failed",
        description: state.message,
      });
      if (state.success) {
        formRef.current?.reset();
        setTimeout(() => {
            logoutAction();
        }, 2000);
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" name="newPassword" type="password" required />
            {state.errors?.newPassword && <p className="text-sm text-destructive">{state.errors.newPassword.join(", ")}</p>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="currentPasswordPass">Current Password</Label>
            <Input id="currentPasswordPass" name="currentPassword" type="password" required />
            {state.errors?.currentPassword && <p className="text-sm text-destructive">{state.errors.currentPassword.join(", ")}</p>}
        </div>
        <SubmitButton text="Update Password" />
    </form>
  )
}

export function SettingsModal() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Admin Settings</DialogTitle>
        <DialogDescription>
          Manage your administrator credentials here.
        </DialogDescription>
      </DialogHeader>
      
      <Tabs defaultValue="username" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="username"><User className="mr-2 h-4 w-4" />Change Username</TabsTrigger>
            <TabsTrigger value="password"><KeyRound className="mr-2 h-4 w-4" />Change Password</TabsTrigger>
        </TabsList>
        <TabsContent value="username" className="pt-4">
          <UpdateUsernameForm />
        </TabsContent>
        <TabsContent value="password" className="pt-4">
          <UpdatePasswordForm />
        </TabsContent>
      </Tabs>
    </>
  );
}
