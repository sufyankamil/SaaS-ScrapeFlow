import React, {Suspense} from 'react'
import {Skeleton} from "@/components/ui/skeleton";
import {getWorkflowsForUser} from "@/actions/workflows/getWorkflowsForUser";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle, InboxIcon} from "lucide-react";
import CreateWorkFlowDialog from "@/app/(dashboard)/workflows/_components/CreateWorkFlowDialog";
import WorkflowCard from "@/app/(dashboard)/workflows/_components/WorkflowCard";

function Page() {
    return (<div className="flex-1 flex-col h-full">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3x1 font-bold">
                        Workflows
                    </h1>
                    <p>
                        Create and manage workflows
                    </p>
                </div>
                <CreateWorkFlowDialog triggerText={"Create workflow"} />
            </div>

            <div className="h-full py-6" >
                <Suspense fallback={<UserWorkflowsSkeleton />}>
                    <UserWorkFlows />
                </Suspense>
            </div>
        </div>
    );
}

function UserWorkflowsSkeleton() {
    return (
        <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
            ))}
        </div>
    )
}

async function UserWorkFlows() {
   try{
       const workflows = await getWorkflowsForUser();

       if(!workflows){
           return (
               <Alert variant={"destructive"}>
                   <AlertCircle className={"w-4 h-4"} />
                   <AlertTitle>Error</AlertTitle>
                   <AlertDescription>
                       Something went wrong. Please try again.
                   </AlertDescription>
               </Alert>
           );
       }

       if (workflows.length === 0) {
           return (
               <div className={"flex flex-col gap-4 h-full items-center justify-center"}>
                   <div className={"rounded-full bg-accent w-20 h-20 flex items-center justify-center"}>
                       <InboxIcon size={50} className={"stroke-primary"} />
                   </div>
                   <div className={"flex flex-col gap-1 text-center"}>
                       <p className={"font-bold"}>
                           No Workflow created yet
                       </p>
                       <p className={"text-sm text-muted-foreground"}>
                           Click the button below to create a new workflow
                       </p>
                   </div>
                   <CreateWorkFlowDialog triggerText={"Create your first workflow"} />
               </div>
           );
       }

       return <div className={"grid grid-cols-1 gap-4"}>
           {workflows.map((workflow) => (
               <WorkflowCard key={workflow.id} workflow={workflow} />
           ))}
       </div>
   } catch (error) {
       const workFlows = await getWorkflowsForUser();

       if(!workFlows){
           return (
               <Alert variant={"destructive"}>
                   <AlertCircle className={"w-4 h-4"} />
                   <AlertTitle>No workflows found</AlertTitle>
                   <AlertDescription>
                       You have not created any workflows yet or you are not authorized to view them.
                   </AlertDescription>
               </Alert>
           )
       }
   }
}


export default Page
