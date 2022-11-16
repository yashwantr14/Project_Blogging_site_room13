const mongoose = require("mongoose")


// validation  of name 
const validName = function(name){
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
} 


// validation of email
const isValidEmail = function (email)
{
    const emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
    return emailRegex.test(email);
}



// validation of password
const isValidPassword = function(password){
    const passwordRegex  = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))$/
    return passwordRegex.test(password);
}





//  validation for ObjectId
const isvalidObjectid = (objectId) =>{
    return mongoose.Types.ObjectId.isValid(objectId);
}


// validation for  title
const isValidTitle = (title) =>{
  const  arr =  [ "Mr", "Mrs", "Miss" ]
  return arr.includes(title)   
}


module.exports = { validName, isValidEmail , isvalidObjectid , isValidTitle, isValidPassword}
