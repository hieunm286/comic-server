const express = require('express')
const {
    API_PREFIX,
    MONGODB_DATABASE,
    MONGODB_PASS,
    MONGODB_PORT,
    MONGODB_URL,
    MONGODB_USER,
    NODE_ENV,
    SERVER_PORT,
    PROJECT_NAME,
} = require('./environment')
const db = require('./database')

const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
import { spawn } from "child_process";

const app = express()
const server = require('http').Server(app)

module.exports = () => {
    console.log('Bootstrap starting time', new Date())
    const urlConnection = `mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_URL}:${MONGODB_PORT}/${MONGODB_DATABASE}`
    console.log(urlConnection)
    const errMes = {}
    const dbConnect = () =>
        db
            .connect(urlConnection)
            .then(async (msg) => {
                console.log(msg)
                console.log('MongoDB Url: ', MONGODB_URL)
                // return seed()
                //     .then(() => {
                //         console.log('Seed success!')
                //     })
                //     .catch((e) => {
                //         console.log('Seed error', e.stack)
                //         errMes.e = e.stack
                //     })
            })
            .catch((err) => {
                console.log({ error: err.message })
                console.log('ERROR DATABASE', err)
                throw err
            })
    const initApi = () => {
        if (NODE_ENV !== 'production') {
            app.use(morgan('dev'))
        }
        app.use(cors())
        // app.use(bodyParser.json({ limit: '50mb' }))
        // app.use(bodyParser.urlencoded({ extended: false }))
        app.use(express.urlencoded());
        app.use(express.json({ limit: '50mb' }))
        app.use(cookieParser())
        app.use(API_PREFIX, require('./api'))
        // app.use('/uploads', express.static(`${__dirname}/../uploads`))
        app.use('/', (req, res) => {
            res.json({
              msg: `Welcome to ${PROJECT_NAME}`,
            });
          })
        app.use((err, req, res, next) => {
            res.json({ error: errMes.e ?? 'INTERNAL_SERVER_ERROR' })
        })
        console.log('Bootstrap ending time', new Date())
    }
    return Promise.all([dbConnect(), initApi()])
        .then((e) => {
            server.setTimeout(7200000)
            server.listen(SERVER_PORT, (err) => {
                if (err) throw err
                console.log(
                    `${PROJECT_NAME} server is listening on port ${SERVER_PORT}`
                )
                console.log(new Date())
            })
        })
        .catch((err) => {
            console.log('Something wrong!', err)
        })
}

module.exports.server = server
