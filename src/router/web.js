import express from 'express'
import homeController from "../controller/homeController"
import { route } from 'express/lib/application'
import userController from "../controller/userController"


let router = express.Router()

let initWebRoute = (app) => {
    router.get("/", homeController.getHomePage)
    router.get("/about", homeController.aboutUser)
    router.get("/crud", homeController.getCRUD)
    router.post("/post-crud", homeController.postCRUD)
    router.get("/display-crud", homeController.displayGetCRUD)
    router.get("/edit-crud", homeController.GetEditCRUD)
    router.post("/change-crud", homeController.updateCRUD)
    router.get("/delete-crud", homeController.deleteCRUD)
    router.get("/api/get-all-user", userController.handleGetAllUser)
    router.post("/api/login", userController.handleLogin)
    router.put("/api/create-new-user", userController.handleCreateNewUser)
    router.post("/api/edit-user", userController.handleEditUser)
    router.delete("/api/delete-user", userController.handleDeleteUser)
    return app.use('/', router)
}

module.exports = initWebRoute 