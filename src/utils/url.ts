export const isValidCallbackUrl = (url: string, WEBAPP_URL: string): boolean => {
    try {
        const parsedUrl = new URL(url);
        const allowedSchemes = ["https:", "http:"];

        // Extract the domain from WEBAPP_URL
        const parsedWebAppUrl = new URL(WEBAPP_URL);
        const allowedDomains = [parsedWebAppUrl.hostname];

        return allowedSchemes.includes(parsedUrl.protocol) && allowedDomains.includes(parsedUrl.hostname);
    } catch (err) {
        console.log(['Invalid URL', err]);
        return false;
    }
};