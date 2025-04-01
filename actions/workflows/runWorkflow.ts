"use server";

import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  ExecutionPhaseStatus,
  workFlowExecutionPlan,
  workflowExecutionStatus,
  workflowExecutionTrigger,
} from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized user");
  }

  const { workflowId, flowDefinition } = form;
  if (!workflowId) {
    throw new Error("workflow ID required");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  });

  if (!workflow) {
    throw new Error("worflow not defined");
  }

  let executionPlan: workFlowExecutionPlan;
  if (!flowDefinition) {
    throw new Error("flow definition not defined");
  }

  const flow = JSON.parse(flowDefinition);

  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error("flow definition is not valid");
  }

  if (!result.executionPlan) {
    throw new Error("no execution plan generated");
  }

  executionPlan = result.executionPlan;

  const execution = await prisma.workFlowExecution.create({
    data: {
      workflowId,
      userId,
      status: workflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: workflowExecutionTrigger.MANUAL,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          });
        }),
      },
    },
    select: {
      id: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error("execution not created");
  }

  redirect(`/workflow/runs/${workflowId}/${execution.id}`);
}
