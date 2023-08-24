import { reject } from "bcrypt/promises";
import userService from "../service/userService"
let handleLogin = async (req, res) => {
    let email = await req.body.email;
    let password = await req.body.password;


    if (!email || !password) {
        return res.status(500).json({
            errcode: 1,
            message: 'Please type your input !',

        })
    }

    let userData = await userService.handleUserLogin(email, password)


    return res.status(200).json({
        // errcode: 0,
        // password: password,
        // message: 'ok',
        // email: email,
        userData,
        message: userData.errMess,
        errcode: userData.errCode
    })
}
let handleGetAllUser = async (req, res) => {

    let id = await req.query.id;

    if (!id) {
        return res.status(500).json(
            {
                errCode: 1,
                errMess: 'Missing params',
                users: []
            }
        )
    }
    let users = await userService.getAllUser(id)



    return res.status(200).json(
        {
            errCode: 0,
            errMess: 'ok',
            users
        }
    )
}
let handleDeleteUser = async (req, res) => {
    let id = req.body.id

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            message: "pls select a user to delete"
        })

    }
    let message = await userService.deleteUserBy(id)
    return res.status(200).json(message)

}
let handleCreateNewUser = async (req, res) => {
    let data = req.body
    // if (!data) {
    //     return res.status(500).json({
    //         errCode: 1,
    //         message: 'pls enter your email'
    //     })
    // }
    console.log(data)
    let message = await userService.createNewUser(data)
    return res.status(200).json(message)
}
let handleEditUser = async (req, res) => {
    let data = req.body

    let message = await userService.editUserData(data)
    return res.status(200).json(message)

}

let getAllCode = async (req,res)=>{
    try{
       
        let data = await userService.getAllcodeService()
      console.log('>>',req.query.input)
        return res.status(200).json(data)


    }
    catch(e){
      console.log(e)
        return res.status(500).json({
            errCode:-1,
            errMess:"server is ....."
        })
    }
}



module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleDeleteUser: handleDeleteUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    getAllCode:getAllCode
}