


const authentication=function(req,res,next){
    let token = req.headers["x-api-key"]
    if (!token) 
    return res.status(400).send({ status: false, msg: "Token must be present" })
    try {var decodedToken = jwt.verify(token, "project-1_group-13")}
    catch(error){return res.send({ status: false, msg: "Token is invalid" })}
    if(decodedToken) next()
}

