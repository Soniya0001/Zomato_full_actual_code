// const user = require("../Models/userDB");
const EmployeeModel = require("../Models/userDB");

// exports.postSignup = (req, res) => {
//     const { email, password, name } = req.body;

//     const UserObj = new user({
//         email,
//         password,
//         name
//     });

//     UserObj.save()
//         .then(response => {
//             res.status(200).json({
//                 message: "User Details saved successfully",
//                 sign: response
//             })
//         })
//         .catch(err => {
//             res.status(500).json({ error: err })
//         })
// };

exports.postSignup = (req, res) => {
   EmployeeModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

// exports.postLogin = (req, res) => {
//     const { email, password, name } = req.body;
//     user.find({
//         email,
//         password
//     })
//         .then(response => {
//             if (response.length > 0) {
//                 res.status(200).json({
//                     message: "user details fetched successfully",
//                     login: response,
//                     isAuthenticated: true
//                 })
//             }
//             else {
//                 res.status(200).json({
//                     message: "User Details not found",
//                     login: response,
//                     isAuthenticated: false
//                 })
//             }

//         })
//         .catch(err => {
//             res.status(500).json({ error: err })
//         })
// }
exports.postLogin =(req, res)=>{
const {name, email, password} = req.body;
EmployeeModel.findOne({email:email})
.then(user => {
    if(user){
        if(user.password === password ) {
            res.json("Success")
            console.log(user.name)
        }else{
            res.json("Invalid Password")
        }
    }else{
        res.json("No record found!!!")
    }
})
}