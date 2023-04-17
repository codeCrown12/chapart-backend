import { Router } from "express";

export interface AppRoute {
    path?: string,
    router: Router
}