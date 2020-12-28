import 'reflect-metadata'
import express from 'express'
import './database/connect'
import router from './routes'

const server = express()

server.use(express.json())
server.use(router)

server.listen(3001, () => console.log('Server started at http://localhost:3001'))
