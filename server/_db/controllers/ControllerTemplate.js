const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { log } = require("../../_shared/logger");
const path = require('path')

/* VARIABLES-START */
const { User } = require('..').models
const Entity = User
const queryLimit = 10

const getSearchColumns = function (queryString) {
    return [
        { title: { [Op.like]: `%${queryString}%` } },
        { artist: { [Op.like]: `%${queryString}%` } },
        { genre: { [Op.like]: `%${queryString}%` } },
        { album: { [Op.like]: `%${queryString}%` } }
    ]
}
/* VARIABLES-END */


// module.exports = {
//     async get (req, res) {
//         log(`${path.basename(__filename)}-GET`, "trace")
//         try {
//             let records = null
//             if (req.params.id) {
//                 records = await Entity.findById(req.params.id)
//             } else if (req.query.search) {
//                 let searchQuery = req.query.search
//                 let searchColumns = getSearchColumns(searchQuery)
//                 records = await Entity.findAll({
//                     where: {
//                         [Op.or]: searchColumns
//                     },
//                     limit: queryLimit
//                 })
//             } else {
//                 records = await Entity.findAll({
//                     limit: queryLimit
//                 })
//             }
//             res.send(records)
//         } catch (ex) {
//             log((path.basename(__filename) + "-get threw: " + ex), "error")
//             res.status(500).send( {
//                 error: "An error occurred."
//             })
//         }
//     },
//     async post (req, res) {
//         try {
//             const record = await Entity.create(req.body)
//             res.send(record)
//         } catch (ex) {
//             log((path.basename(__filename) + "-post threw: " + ex), "error")
//             res.status(500).send( {
//                 error: "Failed to create record."
//             })
//         }
//     },
//     async put (req, res) {
//         try {
//             const record = await Entity.update(req.body, {
//                 where: {
//                     id: req.params.id
//                 }
//             })
//             res.send(req.body)
//         } catch (ex) {
//             log((path.basename(__filename) + "-put threw: " + ex), "error")
//             res.status(500).send( {
//                 error: "Failed to update record."
//             })
//         }
//     }
// }