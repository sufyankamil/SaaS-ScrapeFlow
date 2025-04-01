import { LucideProps } from "lucide-react";
import { TaskParam, TaskType } from "./task";
import { AppNode } from "./appNode";

export enum workFlowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export type workFlowTask = {
  label: string;
  icon: React.FC<LucideProps>;
  type: TaskType;
  isEntryPoint?: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
  credits: number;
};

export type workFlowExecutionPlanPhase = {
  phase: number;
  nodes: AppNode[];
};

export type workFlowExecutionPlan = workFlowExecutionPlanPhase[];
