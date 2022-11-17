
const mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId
const  blogSchema =  new mongoose.Schema
(
    {
    title : 
    {
    type : String,
    required : true,
    trim : true
    },
    body : 
    {
    type : String,
    required : true,
    trim : true
    },
    authorId : 
    {
    type : ObjectId,
    required : true,
    ref : 'ProjectAuthor'
    },
    tags : 
    {
    type : [String],
    trim : true
    },
    category : 
    {
    type : String,
    trim : true,
    require : true
    },
    subcategory : 
    {
    type : [String],
    trim : true   
    },
    DeletedAt : 
    {
    type : Date,
    default : null
    },
    isDeleted : 
    {
    type : Boolean,
    default : false  
    },
    publishedAt : 
    {
    type : Date,
    default : null
    },
    ispublished : 
    {
    type : Boolean,
    default : false
    }
    },
    {timestamps : true}
)
module.exports = mongoose.model('projectBlog',blogSchema)