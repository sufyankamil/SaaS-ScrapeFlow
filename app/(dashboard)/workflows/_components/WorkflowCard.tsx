"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { workFlowStatus } from "@/types/workflow";
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import { Workflow } from "@prisma/client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TooltipWrapper from "@/components/TooltipWrapper";
import DeleteWorkflowDialog from "@/app/(dashboard)/workflows/_components/DeleteWorkflowDialog";

const statusColors = {
  [workFlowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [workFlowStatus.PUBLISHED]: "bg-primary",
};

function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const isDraft = workflow.status === workFlowStatus.DRAFT;
  return (
    <Card
      className={
        "border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30"
      }
    >
      <CardContent
        className={"p-4 flex items-center justify-between h-[100px]"}
      >
        <div className={"flex items-center justify-end space-x-3"}>
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              statusColors[workflow.status as workFlowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className={"h-5 w-5"} />
            ) : (
              <PlayIcon className={"h-5 w-5 text-white"} />
            )}
          </div>
          <div>
            <h3
              className={
                "text-base font-bold text-muted-foreground flex items-center"
              }
            >
              <div>
                <Link
                  href={`/workflow/editor/${workflow.id}`}
                  className={"flex items-center hover:underline"}
                  onClick={(e) => {
                    e.preventDefault();
                    const loaderId = `loader-${workflow.id}`;
                    let loaderContainer = document.getElementById(loaderId);

                    if (!loaderContainer) {
                      loaderContainer = document.createElement("div");
                      loaderContainer.id = loaderId;
                      loaderContainer.className =
                        "fixed inset-0 flex items-center justify-center bg-white/50 z-50";
                      const loader = document.createElement("div");
                      loader.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path></svg>`;
                      loaderContainer.appendChild(loader);
                      document.body.appendChild(loaderContainer);
                    }

                    setTimeout(() => {
                      const existingLoader = document.getElementById(loaderId);
                      if (existingLoader) {
                        document.body.removeChild(existingLoader);
                      }
                      window.location.href = `/workflow/editor/${workflow.id}`;
                    }, 500); // Simulate a delay for the loader
                  }}
                >
                  {workflow.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {workflow.description || "No description available"}
                </p>
              </div>
              {isDraft && (
                <span
                  className={
                    "ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"
                  }
                >
                  {isDraft ? "Draft" : "Published"}
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className={"flex items-center space-x-2"}>
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center px-2 py-0.5"
            )}
            onClick={(e) => {
              e.preventDefault();
              const loaderId = `loader-${workflow.id}`;
              let loaderContainer = document.getElementById(loaderId);

              if (!loaderContainer) {
                loaderContainer = document.createElement("div");
                loaderContainer.id = loaderId;
                loaderContainer.className =
                  "fixed inset-0 flex items-center justify-center bg-white/50 z-50"; // Add your overlay styles in CSS
                const loader = document.createElement("div");
                loader.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path></svg>`;
                loaderContainer.appendChild(loader);
                document.body.appendChild(loaderContainer);
              }

              setTimeout(() => {
                const existingLoader = document.getElementById(loaderId);
                if (existingLoader) {
                  document.body.removeChild(existingLoader);
                }
                window.location.href = `/workflow/editor/${workflow.id}`;
              }, 500); // Simulate a delay for the loader
            }}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkflowActions
            workflowName={workflow.name}
            workflowId={workflow.id}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function WorkflowActions({
  workflowName,
  workflowId,
}: {
  workflowName: string;
  workflowId: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  return (
    <>
      <DeleteWorkflowDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
        workflowId={workflowId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <TooltipWrapper content={"More actions"}>
              <div className={"flex items-center w-full h-full"}>
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={"end"}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={"text-destructive flex  ites-center gap-2"}
            onSelect={() => {
              setShowDeleteDialog((prevState) => !prevState);
            }}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default WorkflowCard;
