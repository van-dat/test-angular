const db = require('../models')
const asyncHandle = require("express-async-handler");

const createRole = asyncHandle(async (req, res) => {
    const { Code, Value } = req.body
    if (!Code || !Value) throw Error('not input')
    const response = await db.Role.create({ Code , Value });
    return res.status(200).json({
        rs: response ? true : false,
        msg: response ? 'role tạo thành công' : 'role đã tồn tại'
    })
});
const updateRole = asyncHandle(async (req, res) => {
    const {id} = req.params
    const response = await db.Role.update(req.body, {where : {id} });
    return res.status(200).json({
        rs: response ? true : false,
        msg: response ? 'role tạo thành công' : 'role đã tồn tại'
    })
});

module.exports = {
    createRole,
    updateRole
}