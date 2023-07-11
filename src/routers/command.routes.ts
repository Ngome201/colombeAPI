import { sendCommand, commandList, detailsCommand, commandListByUser, statistics} from '../controller/command.controller'

const express = require ("express")
const router = express.Router()
const auth = require('../controller/auth.controller')

router.get('/command/commandList/:type',auth,commandList)
router.get('/command/sendCommand/:commandId',auth,sendCommand)
router.get('/command/detailsCommand/:commandId',auth,detailsCommand)
router.get('/command/myCommands/:matricule',auth,commandListByUser)
router.get('/command/statistics',auth,statistics)
// router.get('/commandList',commandList)
// router.get('/sendCommand/:commandId',sendCommand) 
// router.get('/detailsCommand/:commandId',detailsCommand)



module.exports = router