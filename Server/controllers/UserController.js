const db = require('../models')
const bcrypt = require('bcrypt');
const asyncHandle = require("express-async-handler");
const jwt = require('jsonwebtoken');

const createUser = asyncHandle(async (req, res) => {
  const hashPass = Password => bcrypt.hashSync(Password, bcrypt.genSaltSync(10))
  const { Name, MNV, Password, Gioi_tinh, Dia_chi, Ngay_sinh } = req.body
  if (!Name || !MNV || !Password || !Gioi_tinh || !Ngay_sinh || !Dia_chi) throw Error('Missing input')
  const [user, created] = await db.User.findOrCreate({
    where: { MNV },
    defaults: {
      Name,
      MNV,
      Gioi_tinh,
      Dia_chi,
      Ngay_sinh,
      Password: hashPass(Password)
    }
  })
  return res.status(200).json({
    rs: created ? true : false,
    msg: created ? 'Đã đăng ký thành công' : 'NV đã tồn tại',
  })
});

const login = asyncHandle(async (req, res) => {
  const { Name, Password } = req.body
  if (!Name || !Password) throw Error('missing input')
  const response = await db.User.findOne({ where: { Name }, attributes: { exclude: ['updatedAt', 'createdAt'] }, raw: true })
  const checkPass = bcrypt.compareSync(Password, response.Password)
  if (checkPass) {
    const jwts = jwt.sign({ id: response.id, mnv: response.MNV, role: response.Role_code }, process.env.JWT_SECERT, { expiresIn: '3d' })
    if (jwts) res.cookie({ token: jwts }, { httpOnly: true, maxAge: 60 * 1000 })
    return res.status(200).json({
      rs: true,
      msg: 'đăng nhập thành công',
      data: response,
      jwt: jwts
    })
  } else {
    return res.status(200).json({
      rs: false,
      msg: 'Thông tin tài khoản mk k chính các'
    })
  }

})

const getUser = asyncHandle(async (req, res) => {
  const response = await db.User.findAll({ include: [{ model: db.Role, as: 'Chucvu', attributes: ['Code', 'Value'] }], attributes: { exclude: ['Role_code', 'Password', 'updatedAt', 'createdAt'] } })
  return res.status(200).json({
    rs: getUser ? true : false,
    data: response ? response : 'không thể lấy user'
  })
})
const getOneUser = asyncHandle(async (req, res) => {
  const { id } = req.params
  console.log(id)
  const response = await db.User.findOne({ where: { id }, include: [{ model: db.Role, as: 'Chucvu', attributes: ['Code', 'Value'] }], attributes: { exclude: ['Role_code', 'Password', 'updatedAt', 'createdAt'] } })
  return res.status(200).json({
    rs: getUser ? true : false,
    data: response ? response : 'không thể lấy user'
  })
})

const updateUser = asyncHandle(async (req, res) => {
  const { id } = req.user
  const updateFields = req.body;
   const response = await db.User.findOne({
    where: {
      id
    }
  });

  const dataToUpdate = {}
  for (const key in updateFields) {
    if (updateFields[key] !== null) {
      dataToUpdate[key] = updateFields[key];
    }
  }
  console.log(dataToUpdate)
  if (response) {
    await db.User.update( dataToUpdate, { where: { id } });
    return res.status(200).json({
      msg: 'update thành công '
    })
  } else {
    return res.status(422).json({
      msg: 'update k thành công '
    })
  }


})

const deleteUser = asyncHandle(async (req, res) => {
  const { id } = req.params
  const response = await db.User.destroy({
    where: {
      id
    }
  });
  return res.status(200).json({
    rs: response ? true : false,
    msg: response ? 'delete thành công ' : 'k thể deleted'
  })
})
module.exports = {
  createUser,
  getUser,
  getOneUser,
  updateUser,
  deleteUser,
  login
}