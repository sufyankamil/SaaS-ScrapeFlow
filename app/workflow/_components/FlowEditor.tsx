"use client";

import React, { useCallback, useEffect } from "react";
import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import NodeComponent from "@/app/workflow/_components/_nodes/NodeComponent";
import { AppNode } from "@/types/appNode";
import { toast } from "sonner";
import DeletableEdge from "./edges/DeletableEdge";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { flowKey } from "./_nodes/common";

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1 };

function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([
    CreateFlowNode(TaskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      // Debugging: Check if workflow.id is available
      console.log("workflow.id", workflow.id); // Add this to debug

      // Check if workflow.id is available in localStorage and match it with current workflow
      const savedWorkflowData = localStorage.getItem(flowKey);
      const savedFlow = savedWorkflowData
        ? JSON.parse(savedWorkflowData)
        : workflow.definition
        ? JSON.parse(workflow.definition)
        : null;

      if (!savedFlow || savedFlow.workflowId !== workflow.id) {
        console.log("Workflow ID mismatch or no saved data, loading fresh...");
        // If the saved workflow ID doesn't match the current workflow ID, clear localStorage for fresh workflow
        localStorage.removeItem(flowKey);
      } else {
        toast.success("Existing workflow ID matches, loading saved flow...");
      }

      // Now, load the flow from the saved data or the current workflow definition
      const flow = savedFlow || {
        nodes: [],
        edges: [],
        viewport: { x: 0, y: 0, zoom: 1 },
      };

      // Set the nodes, edges, and viewport from the parsed flow
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (flow.viewport) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setViewport({ x, y, zoom });
      }
    } catch (e) {
      toast.error("Error occurred while loading the workflow.");
    }
  }, [workflow.id, workflow.definition, setEdges, setNodes, setViewport]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const taskType = event.dataTransfer.getData("application/reactflow");
      if (typeof taskType === undefined || !taskType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = CreateFlowNode(taskType as TaskType, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));

      if (!connection.targetHandle) return;
      // Remove input value if is present on connection
      const node = nodes.find((nd) => nd.id === connection.target);
      if (!node) return;
      const nodeInputs = node.data.inputs;
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: "",
        },
      });
    },
    [nodes, setEdges, updateNodeData]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      if (connection.source === connection.target) {
        return false;
      }

      const source = nodes.find((node) => node.id === connection.source);
      const target = nodes.find((node) => node.id === connection.target);
      if (!source || !target) {
        toast.error("Invalid connection: Source or target not found");
        return false;
      }

      const sourceTask = TaskRegistry[source.data.type];
      const targetTask = TaskRegistry[source.data.type];

      const input = targetTask.inputs.find(
        (i) => i.name === connection.targetHandle
      );
      const output = targetTask.inputs.find(
        (o) => o.name === connection.sourceHandle
      );

      if (input?.type !== output?.type) {
        toast.error("Invalid connection: type mismatch");
        return false;
      }

      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;
        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      const detectedCycle = hasCycle(target);
      return !detectedCycle;
    },
    [edges, nodes]
  );

  return (
    <main className={"h-full w-full"}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls position={"top-left"} fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
