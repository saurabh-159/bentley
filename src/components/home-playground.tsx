"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export function HomePlayground() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => toast.success("Stack ready. Start building.")}>
          Show toast
        </Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Badge>shadcn/ui</Badge>
        <Badge variant="secondary">Tailwind v4</Badge>
      </div>
      <Separator />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="demo-name">Name</Label>
          <Input id="demo-name" placeholder="Your name" />
        </div>
        <div className="flex items-end gap-3 pb-0.5">
          <Switch id="demo-alerts" defaultChecked />
          <Label htmlFor="demo-alerts">Enable alerts</Label>
        </div>
      </div>
    </div>
  );
}
