"use client"

import React from 'react'
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { TrashIcon } from 'lucide-react';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    nodeId: string;  // ID of the node to be deleted
    nodeName: string;  // Name of the node to be confirmed
    deleteElements: (params: { nodes: { id: string }[] }) => void;
}

function DeleteNodeDialog({ open, setOpen, nodeId, nodeName, deleteElements }: Props) {
    const [confirmText, setConfirmText] = React.useState("");

    const handleDelete = () => {
        // Show loading toast
        toast.loading("Deleting node...", { id: nodeId });

        // Call the deleteElements function
        deleteElements({ nodes: [{ id: nodeId }] });

        // Show success toast after deletion
        toast.success("Node deleted successfully", { id: nodeId });
        setConfirmText("");
        setOpen(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this node?</AlertDialogTitle>
                    <AlertDialogDescription>
                        If you delete this node, you will not be able to recover it.
                        <div className="flex flex-col py-4 gap-2 items-center">
                            <p>
                                If you are sure, enter <b>{nodeName}</b> to confirm.
                            </p>
                            <Input
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                            />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={confirmText !== nodeName}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={handleDelete}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteNodeDialog;