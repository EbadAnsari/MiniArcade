export const dev = import.meta.env.DEV;
export const prod = import.meta.env.PROD;
export const socketUrl = dev ? "http://localhost:3000/" : "error";
