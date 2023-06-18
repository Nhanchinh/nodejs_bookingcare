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

    let id = await req.body.id;
    console.log(id)
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

    console.log("user>>>>", users)

    return res.status(200).json(
        {
            errCode: 0,
            errMess: 'ok',
            users
        }
    )
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser
}