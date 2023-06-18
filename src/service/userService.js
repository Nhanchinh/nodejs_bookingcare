import db from "../models"
import bcrypt from 'bcryptjs'
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}

            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['roleId', 'email', 'passWord'],
                    where: { email: email },
                    raw: true
                })
                console.log(user)
                if (user) {
                    let check = await bcrypt.compareSync(password, user.passWord)
                    // let check = 0;

                    if (check) {
                        userData.errCode = 0;
                        userData.errMess = `login success!`,
                            delete user.passWord,
                            userData.user = user
                    } else {
                        userData.errCode = 3;
                        userData.errMess = `your password isn't correct ! try again`
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMess = `User not found!`
                }

            }
            else {
                userData.errCode = 1;
                userData.errMess = `your email isn't exist! try again`


            }


            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })



}

let checkUserEmail = (emailUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: emailUser },
                raw: true
            })
            if (user) {

                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllUser = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {

            let users = ""

            if (idUser === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['passWord']
                    },

                })


            }
            if (idUser && idUser !== 'All') {
                users = await db.User.findOne({
                    where: { id: idUser },
                    attributes: {
                        exclude: ['passWord']
                    },


                })
            }



            resolve(users)

        }
        catch (e) {
            reject(e)
        }


    })


}






module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser
}