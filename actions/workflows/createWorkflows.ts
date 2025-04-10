/*
 * @param {createWorkflowSchemaType} form - The form data to create a workflow.
*/

"use server";

import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { workFlowStatus } from "@/types/workflow";
import { redirect } from "next/navigation";
import { AppNode } from "@/types/appNode";
import { Edge } from "@xyflow/react";
import { TaskType } from "@/types/task";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Invalid user data");
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: workFlowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      description: data.description ?? "",
      ...data,
    },
  });

  if (!result) {
    throw new Error("Failed too create workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
}
