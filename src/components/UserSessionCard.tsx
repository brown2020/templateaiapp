"use client";

import { Card, CardContent } from "@/components/ui/card";
import moment from "moment";
import { UserSession } from "@/types/auth";
import { LogOut, Monitor, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SessionCardProps {
    session: UserSession
    onSignOut: (sessionId: string) => void
    onRemove: (sessionId: string) => void
}

export function UserSessionCard({ session, onSignOut, onRemove }: SessionCardProps) {
    return (
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <Monitor className="h-4 w-4" />
                            <span className="font-medium">
                                {session.deviceInfo.browser} on {session.deviceInfo.os}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            {session.currentSession ? (
                                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                                    <div className="relative flex h-2 w-2 items-center justify-center">
                                        <div className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-sky-600 dark:bg-sky-400 opacity-75"></div>
                                        <div className="absolute inline-flex h-1.5 w-1.5 rounded-full bg-sky-600 dark:bg-sky-400"></div>
                                    </div>
                                    Your current session
                                </div>
                            ) : session.isActive ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400"></div>
                                    Active
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                                    Signed out
                                </div>
                            )}
                        </div>

                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <div><span className="font-medium text-gray-900 dark:text-gray-200">Location:</span> {session.deviceInfo.location}</div>
                            <div><span className="font-medium text-gray-900 dark:text-gray-200">Last active:</span> {moment(session.lastLoginAt).fromNow()}</div>
                            <div><span className="font-medium text-gray-900 dark:text-gray-200">First seen:</span> {moment(session.createdAt).format('MMMM D, YYYY')}</div>
                        </div>
                    </div>

                    {!session.currentSession && (
                        <div className="flex gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="xs"
                                            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border-gray-200 dark:border-gray-700"
                                            onClick={() => onSignOut(session.deviceInfo.sessionId)}
                                            disabled={!session.isActive}
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign out
                                            <span className="sr-only">Sign out session</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Sign out this session</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            {!session.isActive && <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="xs"
                                            className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border-red-200 dark:border-red-700"
                                            onClick={() => onRemove(session.deviceInfo.sessionId)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Remove session</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Remove this session from history</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}