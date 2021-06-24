var express = require('express');
var router = express.Router();
const Blog = require('../model/blog');
const Pastor = require('../model/pastors');
const SadopProgram = require("../model/sadop_program");
const SadopTestimony = require('../model/sadop-testimony');
const Sermons = require('../model/sermon');
const Disom = require('../model/disom');
const SadopRegLink = require('../model/sadopRegLink');
const UpcomingEvent = require('../model/Events');
const Pastors = require('../model/pastors');
const youtubelink = require('../model/youtubelink');
const Gallery = require('../model/Gallery');

router.get('/', (req,res)=>{

    Gallery
    .find({})
    .sort({'date' : -1})
    .exec((err,gallery)=>{

    Blog
    .find({}).limit(3)
    .sort({'date' : -1})
    .exec((err,blog)=>{

    youtubelink
    .find({}).limit(1)
    .sort({'date' : -1})
    .exec((err,link)=>{

    Sermons
    .find({}).limit(3)
    .sort({'date' : -1})
    .exec((err,ser)=>{

    UpcomingEvent
    .find({}).limit(3)
    .sort({'date' : -1})
    .exec((err,event)=>{

      res.render('index', {

        title: 'Home Page',
        user: req.user,
        blog:blog,
        gallery:gallery,
        ser:ser,
        event:event,
        link:link

      });

    })
    })
    })
    })
    })

  });

// about
router.get('/about', (req,res)=>{
  Pastors
    .find({})
    .sort({'date' : -1})
    .exec((err,pst)=>{
      res.render('about', {

        title: 'About Page',
        user: req.user,
        pst:pst,
        
      });

  })

})



// contact
router.get('/contact', (req,res)=>{
  res.render('contact', {title: 'contact Us'})

})


// contact
router.get('/disom', (req,res)=>{
  Disom
    .find({}).limit(3)
    .sort({'date' : -1})
    .exec((err, disom)=>{
      res.render('DISOM', {

        title: 'Diamond International School of Ministry',
        user: req.user,
        disom:disom,
        
      });

  })

})

// uploading disom
router.get('/UploadDisom', (req,res)=>{
  Disom
    .find({})
    .sort({'date' : -1})
    .exec((err, disom)=>{
      res.render('UploadDisom', {

        title: 'Uploading DISOM',
        user: req.user,
        disom:disom,
        
      });

  })

})

// contact
router.get('/abdgm', (req,res)=>{
  res.render('ABDGM', {title: ''})

})

// sermons
router.get('/sermons', (req,res)=>{
  Sermons
    .find({})
    .sort({'date' : -1})
    .exec((err, ser)=>{
      res.render('sermon', {

        title: 'Sermon Page',
        user: req.user,
        ser:ser,
        
      });

  })

})

// upcoming events
router.get('/events', (req,res)=>{
  UpcomingEvent
    .find({})
    .sort({'date' : -1})
    .exec((err, event)=>{
      res.render('event', {

        title: 'Upcoming events',
        user: req.user,
        event:event,
        
      });

  })

})

// ==========blog upload=============================
router.get('/UploadBgs', (req,res)=>{

  Blog
      .find({})
      .sort({'date' : -1})
      .exec((err,blog)=>{

          res.render('UploadBgs', {

              title: 'Upload blog',
              user: req.user,
              blog:blog
      
          } );
      })

})

// ===============sermons===================
router.get('/UploadSermon', (req,res)=>{

  Sermons
      .find({})
      .sort({'date' : -1})
      .exec((err,ser)=>{

          res.render('UploadSermon', {

              title: 'Upload Sermon',
              user: req.user,
              ser:ser
      
          } );
      })

})

// =====================Events upload===================
router.get('/UploadEvts', (req,res)=>{

  UpcomingEvent
      .find({})
      .sort({'date' : -1})
      .exec((err,event)=>{

          res.render('UploadEvts', {

              title: 'Upload Events',
              user: req.user,
              event:event
      
          } );
      })

})

// ====================Upload Gallery===================
router.get('/UploadGal', (req,res)=>{

  Gallery
      .find({})
      .sort({'date' : -1})
      .exec((err,gallery)=>{

  youtubelink
  .find({}).limit(1)
  .sort({'date' : -1})
  .exec((err,link)=>{

          res.render('UploadGal', {

              title: 'Upload gallery',
              user: req.user,
              gallery:gallery,
              link:link
      
          } );
      })
      })

})

// ====================Upload Pastors===================
router.get('/UploadPst', (req,res)=>{

  Pastor
      .find({})
      .sort({'date' : -1})
      .exec((err,pastor)=>{

          res.render('UploadPst', {

              title: 'Upload Pastor',
              user: req.user,
              pastor:pastor
      
          } );
      })

})

// ====================Upload SADOP-info===================
router.get('/UploadSadopInfo', (req,res)=>{

  SadopProgram
      .find({}).limit(2)
      .sort({'date' : -1})
      .exec((err,sadopProgram)=>{
  
  SadopTestimony
      .find({})
      .sort({'date' : -1})
      .exec((err,sadopTestimony)=>{

  SadopRegLink
    .find({}).limit(1)
    .sort({'date' : -1})
    .exec((err,RegLink)=>{

          res.render('UploadSadopInfo', {

              title: 'Upload Sadop',
              user: req.user,
              sadopProgram:sadopProgram,
              sadopTestimony:sadopTestimony,
              RegLink:RegLink
      
          } );
      })
      })
      })
})

// sadop
router.get('/sadop', (req,res)=>{
  SadopProgram
      .find({}).limit(2)
      .sort({'date' : -1})
      .exec((err,sadopProgram)=>{
  
  SadopTestimony
      .find({}).limit(9)
      .sort({'date' : -1})
      .exec((err,sadopTestimony)=>{

  SadopRegLink
  .find({}).limit(1)
  .sort({'date' : -1})
  .exec((err,RegLink)=>{

        res.render('SADOP', {

            title: 'Sadop',
            user: req.user,
            sadopProgram:sadopProgram,
            sadopTestimony:sadopTestimony,
            RegLink:RegLink
    
        } );
      })
      })
      })

});

// blogs
router.get('/blogs', (req,res)=>{
  Blog
    .find({})
    .sort({'date' : -1})
    .exec((err, blog)=>{
      res.render('blog', {

        title: 'Blog Page',
        user: req.user,
        blog:blog,
        
      });

  })
})

// blog-single
router.get('/:id', (req,res)=>{
  Blog.findOne({ _id :req.params.id})
  .exec((err,blog)=>{
      res.render('blog-single',{
          user: req.user,
          blog : blog,
          title: 'Blog-Single'
      })
  })
})


module.exports = router;