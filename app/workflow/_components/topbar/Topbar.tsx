"use client";

import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import SaveButton from "./SaveButton";
import RestoreButton from "./RestoreButton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import ExecuteButton from "./ExecuteButton";

interface Props {
  title: string;
  subtitle: string;
  workflowId: string;
  hideButtons?: boolean;
}

function Topbar({ title, subtitle, workflowId, hideButtons = false }: Props) {
  const router = useRouter();

  const [autoSave, setAutoSave] = useState<boolean>(false);
  const [debouncedAutoSave] = useDebounce(autoSave, 500);
  const saveButtonRef = useRef<any>(null);
  const isToastActiveRef = useRef(false);
  const isSavingRef = useRef(false);

  useEffect(() => {
    if (debouncedAutoSave) {
      toast.success(
        "Auto Save is enabled. Workflow will auto save on focus loss and every 5 minutes.",
        { id: "auto-save-message" }
      );

      const intervalId = setInterval(() => {}, 5 * 60 * 1000);

      return () => {
        clearInterval(intervalId);
      };
    } else {
      toast.dismiss("auto-save-message");
    }
  }, [debouncedAutoSave]);

  return (
    <header className="flex p-2 border-p-2 border-seperate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-lg truncate">{title}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex gap-1 flex-1 justify-end items-center">
        {hideButtons == false && (
          <>
            <ExecuteButton workflowId={workflowId} />
            <SaveButton workflowId={workflowId} />
          </>
        )}
        {/* <RestoreButton workflowId={workflowId} /> */}
        {/* <Switch
          id="auto-save"
          checked={autoSave}
          onCheckedChange={(checked) => setAutoSave(checked)}
        />
        <Label htmlFor="auto-save">Auto Save</Label> */}
      </div>
    </header>
  );
}

export default Topbar;
