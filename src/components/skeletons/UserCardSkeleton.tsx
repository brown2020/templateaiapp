"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

export function UserCardSkeleton() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarFallback>
            <Skeleton className="h-full w-full rounded-full" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-xl font-bold">
            <Skeleton className="h-6 w-[150px]" />
          </CardTitle>
          <Skeleton className="h-4 w-[200px] mt-1" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <Skeleton className="h-4 w-4 mr-2" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Skeleton className="h-16 w-full" />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-5 w-[80px]" />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-9 w-[120px]" />
      </CardFooter>
    </Card>
  )
}
