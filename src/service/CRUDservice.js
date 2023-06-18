// import { Promise } from "sequelize";
import db from "../models/index"
import bcrypt from 'bcryptjs'
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);






let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let HashPassWordFromBcrypt = await HashPassWordUser(data.password)
            await db.User.create({
                email: data.email,
                passWord: HashPassWordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === "1" ? true : false,

                roleId: data.roleId,
                phonenumber: data.phonenumber,

            })
            resolve("create new user success")

        } catch (e) {
            reject(e)
        }
    })





}





let HashPassWordUser = (password) => {
    return new Promise(async (resolve, reject) => {
        try {

            var hashPassWord = await bcrypt.hashSync(password, salt);
            resolve(hashPassWord)
        } catch (e) {
            reject(e)
        }


    })
}

let getAllUser = () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)

        } catch (e) {
            reject(e)
        }
    })
}


let getDataUserById = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userid },
                raw: true
            })

            if (user) {
                resolve(user)
            } else {
                resolve([])
            }


        } catch (e) {
            reject(e)
        }

    });
}
let upDateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName,
                    user.lastName = data.lastName,
                    user.address = data.address,
                    user.email = data.email

                await user.save()
                resolve()
            } else {
                resolve()
            }
        }
        catch (e) {
            reject(e)
        }
    })


}

let deleteUserById = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: idUser }
            })

            if (user) {
                user.destroy()
            }
            resolve()
        } catch (e) {
            reject(e)
        }


    })



}



module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getDataUserById: getDataUserById,
    upDateUserData, upDateUserData,
    deleteUserById: deleteUserById,
}