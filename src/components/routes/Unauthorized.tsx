import type { Metadata } from "next"
import Link from "next/link"
import { HomeIcon as House, ShieldAlert } from "lucide-react"
import { ROUTES } from "@/utils/constants"

export const metadata: Metadata = {
    title: "401 - Unauthorized",
    description: "You are not authorized to access this page.",
}

export function Unauthorized() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="text-center">
                <p className="text-base font-normal text-muted-foreground">401</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight">Unauthorized Access</h1>
                <p className="mt-6 text-base text-muted-foreground">
                    Sorry, you don&rsquo;t have permission to access this page.
                    <br />
                    Please check your credentials or contact the administrator.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                    <Link
                        href={ROUTES.DASHBOARD}
                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        <House className="mr-2 h-4 w-4" />
                        Go to homepage
                    </Link>
                    <Link
                        href={ROUTES.LOGIN}
                        className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

