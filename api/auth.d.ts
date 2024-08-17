declare module "../auth.js" {
  export function verifyJWT(token: string): { id: string; [key: string]: any };
}