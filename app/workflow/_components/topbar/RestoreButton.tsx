"use client";

import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import React, { useCallback } from "react";
import { toast } from "sonner";
import { ArchiveRestore } from "lucide-react";
import { flowKey } from "../_nodes/common";

function RestoreButton({ workflowId }: { workflowId: string }) {
  const { setNodes, setEdges, setViewport } = useReactFlow();

  const restoreFlow = useCallback(async () => {
    const confirmRestore = window.confirm(
      "Are you sure you want to restore the workflow? Make sure to save your current workflow before restoring."
    );

    if (!confirmRestore) return;

    const flow = localStorage.getItem(flowKey);

    if (flow) {
      try {
        const parsedFlow = JSON.parse(flow);
        const {
          nodes = [],
          edges = [],
          viewport = { x: 0, y: 0, zoom: 1 },
        } = parsedFlow;

        setNodes(nodes);
        setEdges(edges);
        setViewport(viewport);
        toast.success("Workflow restored successfully", {
          id: "restore-workflow",
        });
      } catch (error) {
        toast.error("Failed to restore the workflow", {
          id: "restore-workflow",
        });
      }
    } else {
      toast.error("No saved workflow found", { id: "restore-workflow" });
    }
  }, [setNodes, setEdges, setViewport]);

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={restoreFlow}
    >
      <ArchiveRestore size={16} className="stroke-blue-400" />
      Restore
    </Button>
  );
}

export default RestoreButton;
