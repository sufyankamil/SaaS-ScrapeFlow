"use client"

import { Button } from '@/components/ui/button'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { TaskType } from '@/types/task'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import React from 'react'

export default function TaskMenu() {
    return (
        <aside className='w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-seperate h-full p-2 px-4 overflow-auto'>
            <Accordion type='multiple' className='w-full' defaultValue={["extraction"]}>
                <AccordionItem value='extraction'>
                    <AccordionTrigger className='font-bold'>
                        Data extraction
                    </AccordionTrigger>
                    <AccordionContent className='flex flex-col gap1'>
                        <TaskMenuButton taskType={TaskType.PAGE_TO_HTML} />
                        <TaskMenuButton taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </aside>
    )
}

function TaskMenuButton({ taskType }: { taskType: TaskType }) {
    const task = TaskRegistry[taskType];

    const onDragStart = (event: React.DragEvent, type: TaskType) => {
        event.dataTransfer.setData("application/reactflow", type);
        event.dataTransfer.effectAllowed = "move";
    }

    return (
        <Button variant={"secondary"} className='flex justify-between items-center gap-2 w-full' draggable onDragStart={(event) => onDragStart(event, taskType)}>
            <div className='flex gap-2'>
                <task.icon size={20} />
                {task.label}
            </div>
        </Button>
    );
}
