const asyncHandle = require('express-async-handler')
const db = require('../models')

const Chamcongct = asyncHandle(async (req, res) => {
    const { id } = req.user
    const time = new Date().toLocaleTimeString();
    const response = await db.Chamcong.build({ MNV_code: id, Time_in: time , Status: '0'})
    await response.save()
    return res.status(200).json({
        rs: response ? true : false,
        data: response,
        msg:'chấm công thành công'
    })

})

const getChamcong = asyncHandle(async (req, res) => {
    const response = await db.Chamcong.findAll({ include: [{ model: db.User, as: 'Nhanvien', attributes: ['MNV', 'Name'], }] })
    res.status(200).json({
        rs: response ? true : false,
        data: response
    })
})
const getChamcongUser = asyncHandle(async (req, res) => {
    const { id } = req.params
    const response = await db.Chamcong.findAll({ where: { MNV_code: id }, include: [{ model: db.User, as: 'Nhanvien', attributes: ['MNV', 'Name'], }] })
    const formattedResponse = response.map((item) => {
        return {
            id: item.id,
            MNV_code: item.MNV_code,
            date: new Date(item.createdAt).toISOString().split('T')[0],
            time:item.Time_in,
            MNV: item.Nhanvien.MNV,
            Name: item.Nhanvien.Name,
            Status: item.Status === '1' ? 'Chưa chấm công' : item.Status === '0' ? 'Đã Chấm Công' : 'báo nghĩ'
        };
    });
    res.status(200).json({
        rs: response ? true : false,
        data: formattedResponse
    })
})

module.exports = {
    Chamcongct,
    getChamcong,
    getChamcongUser
}