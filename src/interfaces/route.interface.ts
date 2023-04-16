import { Router } from "express";

export interface appRoute {
    path?: string,
    router: Router
}