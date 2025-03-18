"use client";

import { UpdateWorkflow } from "@/actions/workflows/updateWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import React, { useCallback } from "react";
import { toast } from "sonner";
import { flowKey } from "../_nodes/common";

function SaveButton({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success("Flow saved successfully", { id: "save-workflow" });
    },
    onError: () => {
      toast.success("Something went wrong while saving workflow", {
        id: "save-workflow",
      });
    },
  });

  const onSave = useCallback(() => {
    const workflowDef = JSON.stringify(toObject());
    // Save to localStorage using flowKey
    localStorage.setItem(flowKey, workflowDef);

    toast.loading("Saving Workflow...", { id: "save-workflow" });

    saveMutation.mutate({
      id: workflowId,
      definition: workflowDef,
    });
  }, [workflowId, saveMutation, toObject]);

  return (
    <Button
      disabled={saveMutation.isPending}
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={onSave}
    >
      <CheckIcon size={16} className="stroke-green-400" />
      Save
    </Button>
  );
}

export default SaveButton;
