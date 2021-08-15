const express = require('express');
const router = express.Router();
const multer = require('multer');
const path =  require('path');
const Blog = require('../model/blog');
const Sermon = require("../model/sermon")
const Pastor = require('../model/pastors');
const Disom = require('../model/disom');
const SadopProgram = require("../model/sadop_program");
const SadopTestimony = require('../model/sadop-testimony');
const SadopRegLink = require('../model/sadopRegLink');
const UpcomingEvent = require('../model/Events');
const Gallery = require('../model/Gallery');
const youtubelink = require('../model/youtubelink');

const storage = multer.diskStorage({
    destination: './public/uploads/files',
    filename:function(req,file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// inside multer({}), file upto only 100MB can be uploaded
const upload = multer({
    storage : storage
    
}).fields([

    {
        name: "img",
        maxCount: 4 
    },

    {
        name: "file",
        maxCount: 1
    }
])

router.post('/post',  (req,res)=>{

    // Admin landing page after signing in
})

// post new blog
router.post('/post-bg',  (req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log( req.files.imgUrl[0].filename);
            
            const blog = new Blog({
                title : req.body.title,
                date: req.body.date,
                category:req.body.category,
                excerpt:req.body.excerpt,
                editor1:req.body.editor1,
                imgUrl: '/uploads/files/' +req.files.imgUrl[0].filename
            }).save((err,blog)=>{
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/UploadBgs');
                    // console.log(blog.title)
                }
            })

        }
    })
 
})

//this route helps us to delete a blog post
router.post('/blogDelete/:id', (req,res)=>{
    
    Blog.findByIdAndRemove({ _id : req.params.id }).then((Blog)=>{
        res.redirect('/UploadBgs')
    })

});

// post new blog
router.post('/post-SadopTestimony',  (req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log( req.files.imgUrl[0].filename);
            
            const sadopTestimony = new SadopTestimony({
                name : req.body.title,
                editor1:req.body.editor1,
                imgUrl: '/uploads/files/' +req.files.imgUrl[0].filename
            }).save((err,sadopTestimony)=>{
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/UploadSadopInfo');
                }
            })

        }
    })
 
})

//this route helps us to delete a blog post
router.post('/sadopTestimonyDelete/:id', (req,res)=>{

    SadopTestimony.findByIdAndRemove({ _id : req.params.id }).then((SadopTestimony)=>{
        res.redirect('/UploadSadopInfo')
    })

});

// post new blog
router.post('/post-SadopProgram',  (req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log( req.files.imgUrl[0].filename);
            const sadopProgram = new SadopProgram({
                imgUrl: '/uploads/files/' +req.files.imgUrl[0].filename
            }).save((err,sadopProgram)=>{
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/UploadSadopInfo');
                }
            })

        }
    })
 
})

//this route helps us to delete a blog post
router.post('/SadopProgramDelete/:id', (req,res)=>{
    
    SadopProgram.findByIdAndRemove({ _id : req.params.id }).then((SadopProgram)=>{
        res.redirect('/UploadSadopInfo')
    })

});

// sadop registration link
router.post('/SadopRegLink', (req, res) => {
    const link = new SadopRegLink({

        link : req.body.link,

     }).save((err,link) => {
        if(err) return console.error(err);
        res.redirect('/UploadSadopInfo');
     });
  
  })

  //this route helps us to delete youtubelink post
router.post('/SadopRegLinkDelete/:id', (req,res)=>{
    
    SadopRegLink.findByIdAndRemove({ _id : req.params.id }).then((SadopRegLink)=>{
        res.redirect('/UploadSadopInfo')
    })

});

// =========================Gallery======================================

router.post('/post-gallery',  (req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log( req.files.imgUrl[0].filename);
            
            const gallery = new Gallery({
                name : req.body.name,
                // excerpt:req.body.excerpt,
                imgUrl: '/uploads/files/' +req.files.imgUrl[0].filename
            }).save((err, gallery)=>{
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/UploadGal');
                    
                }
            })

        }
    })
 
})

//this route helps us to delete a gallery post
router.post('/galleryDelete/:id', (req,res)=>{
    
    Gallery.findByIdAndRemove({ _id : req.params.id }).then((Gallery)=>{
        res.redirect('/UploadGal')
    })

});


// =========================Sermon======================================

router.post('/post-sermon',  (req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log( req.files.imgUrl[0].filename);
            
            const ser = new Sermon({
                title : req.body.title,
                name : req.body.name,
                date: req.body.date,
                category:req.body.category,
                excerpt:req.body.excerpt,
                content:req.body.content,
                fileUrl:'/uploads/files/' +req.files.fileUrl[0].filename,
                imgUrl: '/uploads/files/' +req.files.imgUrl[0].filename
            }).save((err, ser)=>{
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/UploadSermon');
                    
                }
            })

        }
    })
 
})

//this route helps us to delete a sermon post
router.post('/SermonDelete/:id', (req,res)=>{
    
    Sermon.findByIdAndRemove({ _id : req.params.id }).then((Sermon)=>{
        res.redirect('/UploadSermon')
    })

});

// =========================Post Pastor======================================

router.post('/post-pastor',  (req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log( req.files.imgUrl[0].filename);
            
            const pastor = new Pastor({
                name : req.body.name,
                imgUrl: '/uploads/files/' +req.files.imgUrl[0].filename
            }).save((err, pastor)=>{
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/UploadPst');
                    
                }
            })

        }
    })
 
})

//this route helps us to delete a pastor post
router.post('/PastorDelete/:id', (req,res)=>{
    
    Pastor.findByIdAndRemove({ _id : req.params.id }).then((Pastor)=>{
        res.redirect('/UploadPst')
    })

});

// =========================Post disom======================================

router.post('/post-disom',  (req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            // console.log( req.files.imgUrl[0].filename);
            
            const disom = new Disom({
                editor1 : req.body.editor1,
                imgUrl: '/uploads/files/' +req.files.imgUrl[0].filename
            }).save((err, disom)=>{
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/UploadDisom');
                    
                }
            })

        }
    })
 
})

//this route helps us to delete a pastor post
router.post('/disomDelete/:id', (req,res)=>{
    
    Disom.findByIdAndRemove({ _id : req.params.id }).then((Pastor)=>{
        res.redirect('/UploadDisom')
    })

});

// youtube link
router.post('/youtube-link', (req, res) => {
    const link = new youtubelink({

        link : req.body.link,
        

     }).save((err,link) => {
        if(err) return console.error(err);
        res.redirect('/UploadGal');
     });
  
  })

  //this route helps us to delete youtubelink post
router.post('/youtubelinkDelete/:id', (req,res)=>{
    
    youtubelink.findByIdAndRemove({ _id : req.params.id }).then((youtubelink)=>{
        res.redirect('/UploadGal')
    })

});

// =========================Events======================================

router.post('/post-events',  (req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log( req.files.imgUrl[0].filename);
            
            const event = new UpcomingEvent({
                title : req.body.title,
                date: req.body.date,
                venue:req.body.venue,
                imgUrl: '/uploads/files/' +req.files.imgUrl[0].filename
            }).save((err,event)=>{
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/UploadEvts');
                    
                }
            })

        }
    })
 
})

//this route helps us to delete a excos post
router.post('/eventDelete/:id', (req,res)=>{
    
    UpcomingEvent.findByIdAndRemove({ _id : req.params.id }).then((UpcomingEvent)=>{
        res.redirect('/UploadEvts')
    })

});


module.exports = router;