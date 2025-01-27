export interface UserSession {
    createdAt: Date;
    lastLoginAt: Date;
    isActive: boolean;
    currentSession?: boolean;
    deviceInfo: {
        ipAddress?: string;
        location?: string;
        os?: string;
        browser?: string;
        sessionId: string;
    };
}

export interface UserMetadata {
    createdAt: Date;
    lastLoginAt: Date;
    displayName?: string;
    email?: string;
    photoURL?: string;
}
