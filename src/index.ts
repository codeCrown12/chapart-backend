import App from "./app"
import AuthRoute from "./routes/auth.route"

async function bootstrap() {
    const app = new App([
        new AuthRoute()
    ])
    app.listen()
}

bootstrap()