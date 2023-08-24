// import { Promise } from "sequelize";
import db from "../models"
import bcrypt from 'bcryptjs'
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
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

let deleteUserBy = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userSelect = await db.User.findOne({
                where: { id: idUser },
                raw: false
            })
            if (!userSelect) {
                resolve({
                    errCode: 1,
                    message: "user not found in system"
                })
            }
            userSelect.destroy()
            resolve({
                errCode: 0,
                message: "delete user success"
            })


        } catch (e) {
            reject(e)
        }
    })



}
let createNewUser = (dataNewUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let emailIsExist = await checkUserEmail(dataNewUser.email)
            console.log(emailIsExist)
            if (emailIsExist) {
                resolve({
                    errCode: 1,
                    message: "your email is exist pls try another email"
                })
            }
            else {

                let HashPassWordFromBcrypt = await HashPassWordUser(dataNewUser.password)
                await db.User.create({
                    email: dataNewUser.email,
                    passWord: HashPassWordFromBcrypt,
                    firstName: dataNewUser.firstName,
                    lastName: dataNewUser.lastName,
                    address: dataNewUser.address,
                    gender: dataNewUser.gender === "1" ? true : false,

                    roleId: dataNewUser.roleId,
                    phonenumber: dataNewUser.phonenumber,

                })
                resolve({
                    errCode: 0,
                    message: "create new user success"
                })
            }

        } catch (e) {
            reject(e)
        }
    })




}
let editUserData = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false

            })
            console.log(user)
            if (user) {
                user.firstName = data.firstName,
                    user.lastName = data.lastName,
                    user.address = data.address,
                    user.email = data.email,

                    await user.save()
                resolve({
                    errCode: 0,
                    message: "update user success"
                })
            }
            resolve({
                errCode: 1,
                message: "no found user"
            })

        }
        catch (e) {
            reject(e)
        }
    })
}


let getAllcodeService=()=>{
return new Promise(async(resolve,reject)=>{
try{
    let res={}
    let allcode = await db.allcode.findAll({
      
    })
    res.errCode=0;
    res.data=allcode
    resolve(res)



}catch(e){
reject(e)
}

})



}





module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    deleteUserBy: deleteUserBy,
    createNewUser: createNewUser,
    editUserData: editUserData,
    getAllcodeService:getAllcodeService

}