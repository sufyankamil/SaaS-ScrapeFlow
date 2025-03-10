"use server"
import {createWorkflowSchema, createWorkflowSchemaType} from "@/schema/workflow";
import prisma from "@/lib/prisma";
import {auth} from "@clerk/nextjs/server";
import {workFlowStatus} from "@/types/workflow";
import {redirect} from "next/navigation";

export async function CreateWorkflow(
    form: createWorkflowSchemaType
){
    const {success, data} = createWorkflowSchema.safeParse(form);

    if(!success){
        throw new Error("Invalid form data");
    }

    const {userId}  = await auth();

    if(!userId){
        throw new Error("Invalid user data");
    }

    const result = await prisma.workflow.create({
        data: {
            userId,
            status: workFlowStatus.DRAFT,
            definition: "TODO",
            description: data.description ?? "",
            ...data
        }
    })

    if(!result){
        throw new Error("Failed too create workflow");
    }

    redirect(`/workflow/editor/${result.id}`);
}