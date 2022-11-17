const blogsModel = require("../Models/BlogModel")
const jwt = require('jsonwebtoken')
const {  isvalidObjectid } = require("../validation/validations")

const authentication=function(req,res,next)
{
    try{


    let token = req.headers["x-api-key"]
    if (!token) 
    return res.status(400).send({ status: false, msg: "Token must be present" })
    let decodedToken = jwt.verify(token, "project-1_group-13")
    if(!decodedToken) 
    return res.status(401).send({ status: false, msg: "Token is invalid" })
    req.token = decodedToken
    next()
    }catch(err){
    return res.status(500).send({msg : err.message})
    }
}

const authorization =  async function (req, res, next)
{
   
      try{
        let authorId=req.token.authorId

        if(req.params.blogId){

        if(!isvalidObjectid(req.params.blogId))
        return  res.status(400).send({status : false , msg : " Invalid blogId "})
            
        
        let blogId=req.params.blogId
        let blogData = await blogsModel.findById(blogId)
        if(!blogData){
            return  res.status(404).send({status : false , msg : "blog not found"})
        }
        let loggedAuthorId = blogData.authorId.toString()
        if(authorId !== loggedAuthorId) return res.send("ERROR : Unauthorized to perform this action")
        next()

        }else if(req.query){
        
        let data=req.query
        if(data.ispublished)
        {        
            data.ispublished = data.ispublished =='true' ? true : false
        }
        if(data.tags){   
            let a = JSON.parse(data.tags)
            data.tags = a
            let tagdata = await blogsModel.findOne({tags : data.tags})
            var author = tagdata.authorId.toString()
            if( authorId !== author) return res.send("ERROR : Unauthorized to perform this action")
            next()
        }
        if(data.subcategory){
            let a = JSON.parse(data.subcategory)
            data.subcategory = a
            let subcategorydata = await blogsModel.findOne({subcategory : data.subcategory})
            var author = subcategorydata.authorId.toString()
            if( authorId !== author) return res.send("ERROR : Unauthorized to perform this action")
            next()
        }
       
        
        let blogdata=await blogsModel.findOne(data)
        
        
        let loggedAuthorId= blogdata.authorId.toString()
        
        if(authorId !== loggedAuthorId) return res.send("ERROR : Unauthorized to perform this action")
        next()

        }
    }catch(err)
    {
        return res.status(500).send({status : false, msg : err.message})
    }
}

module.exports = { authentication, authorization}