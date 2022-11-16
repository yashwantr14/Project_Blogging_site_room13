
const autherModel = require("../Models/AuthorModel")
const jwt  = require("jsonwebtoken")
const { isValidObjectId }   = require("mongoose")
const validation = require("../validation/validations")

let {   validName ,  isValidEmail ,  isValidTitle ,  isValidPassword   } = validation




const createdAuthor = async function(req, res){
    try{
        const data = req.body;

        if(Object.keys(data).length == 0){
            return res.status(400).send({ status : "false" ,message : "All fields are mandatory"});
        }


        let { fname , lname , title , email, password } = data

        if(!fname || !lname || !title || !email || !password){
            return res.status(400).send({ status : "false" , message : "All field are  mandatory"})
        }
      
        
      if(!validName(fname)){
        return res.status(400).send({status : "false", message : "first name must be in alphabet"})
      }


      if(!validName(lname)){
        return res.status(400).send({status : "false", message : "last name must be in alphabet"})
      }

      if(!isValidTitle(title)){
        return res.status(400).send({status : "false", message : "valid title given"})
      }

      
      if(!isValidEmail(email)){
        return res.status(400).send({status : "false", message : "provide a valid email"})
      }

      if(!isValidPassword(password)){
        return res.status(400).send({status : "false", message : "provide a valid password"})
      }



      const result = await autherModel.create(data);
      return res.status(201).send({ status : true , msg : "data created successfully",data : result})

    }
    catch(err) {
        return res.status(500).send({ status : false , msg : err.message})
    }
}


const login =async function(req,res)
{
  const email=req.body.email
  const password=req.body.password
  const data=await authorModel.find({email:email, password:password})
  if(!data)
  {
    res.status(404).send({status : false , message: "invalid email or password"});
  }
  authorId=data.authorId
  const token =jwt.sign({
    authorId : authorId
  },  "project-1_group-13"  );

  res.setHeader("x-api-key", token);
  res.status(201).send({status: true ,Token: token})
}



module.exports = { login , createdAuthor}
