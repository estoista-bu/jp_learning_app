
"use client"

import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface GrammarContainerProps {
    isMainView: boolean;
    onBack: () => void;
    title: string;
    children: React.ReactNode;
}

export function GrammarContainer({ isMainView, onBack, title, children }: GrammarContainerProps) {
    const subheaderHeight = 'h-subheader'; // Corresponds to theme.height.subheader

    return (
        <div className="flex flex-col h-full relative">
            {!isMainView && (
                <>
                    <div className={cn("sticky top-header z-10 bg-background/95 backdrop-blur-sm", subheaderHeight)}>
                        <div className="flex items-center p-4 border-b h-full">
                            <button onClick={onBack} className="flex-shrink-0 flex items-center text-sm p-2 rounded-md hover:bg-muted -ml-2">
                                <ArrowLeft className="h-4 w-4 mr-1" />
                                Back
                            </button>
                            <div className="flex-grow min-w-0 pl-4">
                                <h3 className="font-headline text-lg font-bold text-primary">
                                    {title}
                                </h3>
                            </div>
                        </div>
                    </div>
                     {/* This div is a placeholder to prevent content from jumping underneath the sticky header */}
                    <div className={cn("flex-shrink-0", subheaderHeight)} />
                </>
            )}
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}
