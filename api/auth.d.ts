// auth.d.ts

declare module "./auth.js" {
  export function createJWTToken(payload: { id: string; [key: string]: any }): string;
  export function verifyJWTToken(token: string): { id: string; [key: string]: any };
}