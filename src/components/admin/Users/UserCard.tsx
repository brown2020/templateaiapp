"use client"
import React from "react"
import initials from 'initials';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Phone, Shield, ShieldOff, Clock } from "lucide-react"
import useAdminStore, { User } from "@/zustand/useAdminStore"
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";

interface UserCardProps {
    user: User
    onRoleChange: (uid: string, isAdmin: boolean) => void
}

export function UserCard({ user, onRoleChange }: UserCardProps) {
    const { adminLoaders } = useAdminStore();
    const activeSessions = user.sessions.filter((session) => session.isActive).length

    return (
        <Card className="w-full flex flex-col">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={user.profile.photoUrl} alt={user.displayName} />
                    <AvatarFallback className="font-bold text-muted-foreground select-none">{initials(user?.displayName?.toUpperCase() || user?.email?.toUpperCase() || '')}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <CardTitle className={`text-xl font-bold ${!user.displayName && "text-muted-foreground"}`}>{user.displayName || "No Name"}</CardTitle>
                    <p className="text-sm text-muted-foreground">{user.profile.phoneticName || user.email}</p>
                </div>
            </CardHeader>
            <CardContent className="pt-4 flex-grow">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm truncate">{user.profile.location || "N/A"}</span>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                        <TooltipWrapper tooltip={user.profile.contactEmail || "N/A"}
                            onChildClick={() => {
                                navigator.clipboard.writeText(user.profile.contactEmail || "N/A")
                            }}>
                            <span className="text-sm truncate">{user.profile.contactEmail || "N/A"}</span>
                        </TooltipWrapper>
                    </div>
                    <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm truncate">{user.profile.phone || "N/A"}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm">{activeSessions}active sessions</span>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{user.profile.bio}</p>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                    <Badge variant="secondary">Credits: {user.profile.credits}</Badge>
                    <Badge variant={user.profile.emailVerified ? "default" : "secondary"}>
                        {user.profile.emailVerified ? "Verified" : "Unverified"}
                    </Badge>
                    {user.isAdmin && <Badge variant="default">Admin</Badge>}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto">
                <TooltipWrapper tooltip={user.isAdmin ? "Remove admin privileges" : "Grant admin privileges"}>
                    <Button variant="outline" size="xs"
                        onClick={() => onRoleChange(user.uid, !user.isAdmin)}
                        disabled={adminLoaders[user.uid]}
                        loading={adminLoaders[user.uid]}>
                        {!adminLoaders[user.uid] && (user.isAdmin ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />)}
                        {user.isAdmin ? "Remove Admin" : "Make Admin"}
                    </Button>
                </TooltipWrapper>
            </CardFooter>
        </Card>
    )
}

