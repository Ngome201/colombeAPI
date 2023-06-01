const express = require ('express')
import { AppDataSource } from '../app'
import { User } from '../models'
const userRepo = AppDataSource.getRepository(User)
const router = express.Router()