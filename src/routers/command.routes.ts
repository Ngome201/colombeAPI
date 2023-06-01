import { sendCommand, commandList, detailsCommand} from '../controller/command.controller'

const express = require ("express")
const router = express.Router()

router.get('/command/commandList',commandList)
router.get('/command/sendCommand/:commandId',sendCommand)
router.get('/command/detailsCommand/:commandId',detailsCommand)

// router.get('/commandList',commandList)
// router.get('/sendCommand/:commandId',sendCommand)
// router.get('/detailsCommand/:commandId',detailsCommand)



module.exports = router