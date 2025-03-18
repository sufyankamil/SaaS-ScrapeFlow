import React from "react";
import { Handle, Position, useEdges } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import NodeParamField from "@/app/workflow/_components/_nodes/NodeParamField";
import { ColorHandle } from "./common";

export function NodeInputs({ children }: { children: React.ReactNode }) {
    return <div className={"flex flex-col divide-y gap-2"}>
        {children}
    </div>
}

export function NodeInput({ input, nodeId }: { input: TaskParam, nodeId: string }) {
    const edges = useEdges();
    const isConnected = edges.some(
        (edge) => edge.target === nodeId && edge.targetHandle === input.name
    );

    return (
        <div className={"flex justify-start relative p-3 bg-secondary w-full"}>
            <NodeParamField
                param={input}
                nodeId={nodeId}
                disabled={isConnected}
            />
            {!input.hideHandle && (
                <
                    Handle type={"target"}
                    isConnectable={!isConnected}
                    position={Position.Left}
                    id={input.name}
                    className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
                        ColorHandle[input.type])}
                />
            )}
        </div>
    );
}