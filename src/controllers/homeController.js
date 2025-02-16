import db from "../models/index";
import CRUDservice from "../services/CRUDservice";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs',{
            data : JSON.stringify(data)
        });
    }catch (e) {
        console.log(e)  
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCuongPage = (req, res) => {
    return res.render('test/cuong.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message);
    return res.render('post-crud.ejs');
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    
    return res.render('displayCRUD.ejs',{
        dataTable: data
    });
}

let getEditCRUD = async (req,res) => {
    let userId = req.query.id;
    
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId);

        // x <- y
        return res.render('editCRUD.ejs',{
            user: userData
        });
    }
    else{
        return res.send('user not found!');
    }
}

let putCRUD = async (req,res) => {
    let data = req.body;
    let addUsers = await CRUDservice.updateUserData(data);
    return res.render('displayCRUD.ejs',{
        dataTable: addUsers
    });
}

let deleteCRUD = async (req,res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservice.deleteUserById(id);
        return res.send('delete the user succeed');
    } else {
        return res.send('user not found!');
    }
  
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCuongPage: getCuongPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}