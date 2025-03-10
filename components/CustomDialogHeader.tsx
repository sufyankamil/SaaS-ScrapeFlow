"use client"
import React from 'react'
import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";

interface Props {
    title?: string;
    subTitle?: string;
    icon?: LucideIcon;

    titleClassname?: string;
    subtitleClassname?: string;
    iconClassname?: string;
}

function CustomDialogHeader(props: Props) {
    const Title = props.title;
    const subTitle = props.subTitle;
    const Icon = props.icon;

    return (
        <DialogHeader className={"py-6"}>
            <DialogTitle asChild>
                <div className={"flex flex-col items-center gap-2 mb-2"}>
                    {
                        Icon && (
                            <Icon size={30} className={cn("stroke-primary", props.iconClassname)}
                            />
                        )
                    }
                    {
                        Title && (
                            <p className={cn("text-x1 text-primary", props.titleClassname)}>
                                {Title}
                            </p>
                        )
                    }
                    {
                        subTitle && (
                            <p className={cn("text-sm text-muted-foreground", props.subtitleClassname)}>
                                {subTitle}
                            </p>
                        )
                    }
                </div>
            </DialogTitle>
            <Separator />
        </DialogHeader>
    )
}

export default CustomDialogHeader
