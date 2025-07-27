import { adminSuperBase } from "./adminSuperBase.js";

// Verifica si usuario tiene privilegios de super usuario
export const adminAuth = adminSuperBase("isAdmin");