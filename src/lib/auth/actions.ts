export function APIAuth(key: string | null): boolean {
    return key === process.env.API_KEY;
}