import React from 'react'
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Editor from "@/app/workflow/_components/Editor";

async function Page({ params }: { params: { workflowId: string } }) {
    const workflowId = params.workflowId
    const { userId } = await auth();

    if (!userId) {
        return <div>User not authenticated</div>
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId,
        },
    });

    if (!workflow) {
        return <div>Workflow not found</div>
    }

    return (
        // <pre>
        //     {JSON.stringify(workflow, null, 2)}
        // </pre>
        <Editor workflow={workflow} />
    )
}

export default Page
