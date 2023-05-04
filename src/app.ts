import express, { Application, Request } from "express"
import cors from "cors"
import { AppRoute } from "./interfaces/route.interface"
import errorMiddleware from './middlewares/error.middleware'
import morganMiddleware from './middlewares/morgan.middleware'
import database from "./database"
import { logger } from './utils/logger'
import { PORT } from "./config"
import { StatusCodes } from "http-status-codes"
import AuthRoute from "./routes/auth.route"
import UserRoute from "./routes/user.route"

class App  {

  public app: Application
  public database: typeof database
  private port: number | string

  constructor(routes: AppRoute[]) {
    this.app = express()
    this.port = PORT || 3000
    this.database = database
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeDatabase()
    this.initializeErrorHandling()
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`⚡️[server]: Server is running @ http://localhost:${this.port}`)
    })
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json())
    this.app.use(cors<Request>())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morganMiddleware)
  }

  private initializeRoutes(routes: AppRoute[]): void {
    this.app.get('/', (req, res) => res.status(StatusCodes.OK).send("Chap art backend 😁"))
    routes.forEach(route => {
      this.app.use(`/v1${route.path}`, route.router)
    })
  }

  private async initializeDatabase(): Promise<void>{
    try {
      await this.database.connect()
      logger.info(`🛢️ [Database]: Database connected`)
    } catch (error) {
      logger.error(`🛢️ [Database]: Database connection failed >>> ERROR: ${error}`)
    }
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

}

export default new App([
  new AuthRoute(),
  new UserRoute()
])