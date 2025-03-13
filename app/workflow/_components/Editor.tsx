"use client"

import React from 'react'
import { Workflow } from "@prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "@/app/workflow/_components/FlowEditor";
import Topbar from './topbar/Topbar';

function Editor({ workflow }: { workflow: Workflow }) {
    return (
        <ReactFlowProvider>
            <div className={"flex flex-col h-full w-full overflow-hidden"}>
                <Topbar title='Workflow editor' subtitle='Create, edit, and manage your workflow configurations to optimize processes and streamline tasks.' workflowId={ workflow.id} />
                <section className={"flex h-full overflow-auto"}>
                    <FlowEditor workflow={workflow} />
                </section>
            </div>
        </ReactFlowProvider>
    )
}

export default Editor
