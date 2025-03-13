"use client"

import TooltipWrapper from '@/components/TooltipWrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import SaveButton from './SaveButton'

interface Props {
    title: string;
    subtitle: string;
    workflowId: string;
}

function Topbar({ title, subtitle, workflowId }: Props) {
    const router = useRouter();

    return (
        <header className='flex p-2 border-p-2 border-seperate justify-between w-full h-[60px] sticky top-0 bg-background z-10'>
            <div className='flex gap-1 flex-1'>
                <TooltipWrapper content="Black">
                    <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
                        <ChevronLeftIcon size={20} />
                    </Button>
                </TooltipWrapper>
                <div>
                    <p className='font-bold text-lg truncate'>{title}</p>
                    {subtitle && (
                        <p className='text-sm text-muted-foreground truncate'>{subtitle}</p>
                    )}
                </div>
            </div>
            <div className='flex gap-1 flex-1 justify-end'>
                <SaveButton workflowId={workflowId} />
            </div>
        </header>
    )
}

export default Topbar
