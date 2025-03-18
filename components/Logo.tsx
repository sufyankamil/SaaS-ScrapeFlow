import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";

function Logo({
  fontSize = "text-2x1",
  iconSize = 25,
}: {
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <div className="flex items-center justify-center h-[50px] border-b border-separate">
      <Link
        href={"/"}
        className={cn(
          "text-2x1 font-extrabold flex items-center gap-2",
          fontSize
        )}
      >
        <div className="rounded-x1 bg-gradient-to-r from-emerald-500 to-emerald-600 p-1">
          <SquareDashedMousePointer size={iconSize} className="stroke-white" />
        </div>
        <div>
          <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
            Scrum
          </span>
          <span className="text-stone-700 dark:text-stone-300">Board</span>
        </div>
      </Link>
    </div>
  );
}

export default Logo;
