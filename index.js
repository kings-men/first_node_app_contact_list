const express   =   require('express');
const path      =   require('path');
const port      =   8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const { create } = require('domain');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


//Middleware 1
app.use(function(req, res, next){
    req.myName = 'firstMW1';
    console.log('Middleware 1 called!');
    next();
});
//Middleware 2
app.use(function(req, res, next){
    console.log(req.myName);
    console.log('Middleware 2 called');
    next();
});


var contactList = [
    {
        name : 'Arpan',
        phone: '1111111'
    },
    {
        name : 'Amit Kumar',
        phone: '222222'
    }
];


app.get('/', async (req,res) => {
    // res.send('<h1>Cool it is running<//h1>');

    try {
        
        const newContact = await Contact.find({});
        
        return res.render('home', {
          title: "My contacts List",
          contact_list: newContact
        });

    } catch (err) {

    console.log(err);
    res.status(500).send('An error occurred');
    
    }

});

app.get('/practice', function(req, res){
    return res.render('practice',{
        title : "Yes! my Playground",
        friend: "AK"
    });
});

app.get('/profile', function(req,res){
    res.send('<h1>My Profile here!<//h1>');
});


app.post('/create-contact', async (req, res) => {

    //     // contactList.push({
    //     //     name    :   req.body.name,
    //     //     phone   :   req.body.phone
    //     // });
    //     // contactList.push(req.body);

    const newContact = await Contact.create({
      name: req.body.name,
      phone: req.body.phone
    });
  
    if (newContact) {
      console.log('******', newContact);
      return res.redirect('back');
    } else {
      console.log('error in creating contact');
      return res.redirect('/');
    }

    // commented due to storing into mongo db
    // return res.redirect('/');

  });


app.get('/delete-contact/', async (req, res) => {
    
    const deleteContact = await Contact.findByIdAndDelete(req.query.id);
    console.log('$$$$$',deleteContact);
    
    return res.redirect('back');
});



app.listen(port,function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log(__dirname);
    console.log('Jai Shree Ram! My server running on port', port);
});