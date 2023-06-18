import db from "../models/index"
import CRUDservice from "../service/CRUDservice"

let getHomePage = async (req, res) => {

    let data = await db.User.findAll()

    return res.render("homePage.ejs", {
        data: JSON.stringify(data)
    })
}


let aboutUser = (req, res) => {
    return res.send('xin chào mình là thân chính đến từ KMA')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {

    let message = await CRUDservice.createNewUser(req.body)
    console.log(message)
    return res.send('post ok from crud')
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();

    return res.render('displayCRUD.ejs', {
        datatable: data
    })
}

let GetEditCRUD = async (req, res) => {
    let idUser = req.query.id
    if (idUser) {
        let dataUser = await CRUDservice.getDataUserById(idUser)

        res.render("editCRUD.ejs", {
            data: dataUser
        })

    } else {
        res.send("user is not found")
    }


}

let updateCRUD = async (req, res) => {
    let data = req.body

    await CRUDservice.upDateUserData(data)


    return res.redirect("/display-crud")





}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    await CRUDservice.deleteUserById(id)

    res.redirect('/display-crud');
}



module.exports = {
    getHomePage: getHomePage,
    aboutUser: aboutUser,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    GetEditCRUD: GetEditCRUD,
    updateCRUD: updateCRUD,
    deleteCRUD: deleteCRUD,
}


