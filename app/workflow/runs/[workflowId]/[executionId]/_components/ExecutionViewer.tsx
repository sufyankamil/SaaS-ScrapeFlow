// This file is part of the Workflow Execution Viewer component.

"use client";

import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import { workflowExecutionStatus } from "@/types/workflow";
import { Separator } from "../../../../../../components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  LucideIcon,
  WorkflowIcon,
} from "lucide-react";
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DatesToDurationString } from "@/lib/helper/dates";
import { GetPhasesTotalCost } from "@/lib/helper/phases";

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

function ExecutionViewer({ initialData }: { initialData: ExecutionData }) {
  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === workflowExecutionStatus.RUNNING ? 1000 : false,
    initialData,
  });

  const duration = DatesToDurationString(
    query.data?.completedAt,
    query.data?.startedAt
  );

  const creditsConsumed = GetPhasesTotalCost(query.data?.phases || []);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (query!.data?.trigger === "MANUAL") {
      setIsDialogOpen(true); // Open modal if the trigger is manual
    } else {
      setIsDialogOpen(false);
    }
  }, [query]);

  return (
    <div className="flex w-full h-screen">
      {" "}
      <aside className="w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-seperate flex flex-grow flex-col overflow-hidden h-full">
        {" "}
        <div className="py-4 px-2">
          {/* Status label at */}
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={query.data?.status}
          />

          {/* Started At label */}
          <ExecutionLabel
            icon={CalendarIcon}
            label="Started at"
            value={
              <span className="lowercase">
                {query.data?.startedAt
                  ? formatDistanceToNow(new Date(query.data?.startedAt), {
                      addSuffix: true,
                    })
                  : "-"}
              </span>
            }
          />

          {/* Duration */}
          <ExecutionLabel
            icon={ClockIcon}
            label="Duration"
            value={
              <span className="lowercase">
                {duration ? (
                  duration
                ) : (
                  <Loader2Icon className="animate-spin" size={20} />
                )}
              </span>
            }
          />

          {/* Credits */}
          <ExecutionLabel
            icon={CoinsIcon}
            label="Credits consumed"
            value={<span className="lowercase">in progress</span>}
          />
        </div>
        <Separator />
        <div className="flex justify-center items-center py-2 px-4">
          <div className="text-muted-foreground flex items-center gap-2">
            <WorkflowIcon size={20} className="stroke-muted-foreground/80" />
            <span className="font-semibold">Phases</span>
          </div>
        </div>
        <Separator />
        <div className="overflow-auto h-full px-2 py-4">
          {query.data?.phases.map((phase, index) => (
            <Button
              key={phase.id}
              className="w-full justify-between"
              variant={"ghost"}
            >
              <div className="flex items-center gap-2">
                <Badge variant={"outline"}>{phase.number}</Badge>
                <p className="font-semibold">{phase.name}</p>
              </div>
            </Button>
          ))}
          {query.data?.phases.length === 0 && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No phases available
            </div>
          )}

          <div className="text-muted-foreground bg-red-500 py-1 bg-red-400 rounded-md shadow-md animate-pulse block sm:inline mb-2">
            This workflow was triggered manually and is not yet complete.
          </div>
        </div>
      </aside>
    </div>
  );
}

export default ExecutionViewer;

/**
 * A functional component that displays a labeled value with an optional icon.
 * It is styled for a clean and compact layout, making it suitable for use in
 * execution or workflow viewers.
 *
 * @param {Object} props - The properties object.
 * @param {LucideIcon} props.icon - The icon component to display alongside the label.
 * @param {ReactNode} props.label - The label text or element to describe the value.
 * @param {ReactNode} props.value - The value text or element to display.
 *
 * @returns {JSX.Element} A styled component displaying an icon, label, and value.
 */
function ExecutionLabel({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: ReactNode;
  value: ReactNode;
}): JSX.Element {
  const Icon = icon;

  return (
    <div className="flex justify-between items-center py-2 px-4 text-sm">
      <div className="text-muted-foreground flex items-center gap-2">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="font-semibold capitalize flex-2 items-center">
        {value}
      </div>
    </div>
  );

  /* The component is designed to be flexible and can be used in various contexts
       where a labeled value is needed, such as in dashboards, settings panels,
       or any other UI component that requires clear labeling of information. 
       */
}
