const Customer = require("../models/Customer");
const mongoose =  require("mongoose");



/* GET / HOMEPAGE
*/

exports.homepage = async (req, res) => {

    const messages = await req.flash('info');
    const locals = {
      title: 'NodeJs',
      description: 'Free NodeJs User Management System'
    }

    let perPage = 10;
    let page = req.query.page || 1;

    try {
      const customers = await Customer.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await Customer.count();

      res.render('index', {
        locals,
        customers,
        current: page,
        pages: Math.ceil(count / perPage),
        messages
      });

    } catch (error) {
      console.log(error);
    }
}


/* GET / about page
*/

exports.about = async (req,res) => {
    //console.log("entered the views page")
    try{
      
        res.render("about");


    }catch(error){
        console.log(error);

    }
}




// exports.homepage = async (req,res) => {
//     const messages = await req.flash('info');
//     try{
//          const customers = await Customer.find({}).limit(22);
//           res.render("index" , {messages, customers});

//     }catch(error){
//            console.log(error);
//     }
    
// }

/* GET / add customber
*/

exports.addCustomer = async (req,res) => {
    res.render("customer/add");
}

/* POST / create new customber
*/

exports.postCustomer = async (req,res) => {

    //console.log(req.body);
const newCustomer = new Customer({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    tel : req.body.tel,
    email : req.body.email,
    details : req.body.details,
});
try{
  await Customer.create(newCustomer);
   req.flash('info',"New customer has been added")
   res.redirect('/');
}
catch(error)
{
    console.log(error);
}

    
    
}

/* GET /  customber data
*/

exports.view = async (req,res) => {
    //console.log("entered the views page")
    try{
        const customer = await Customer.findOne({_id: req.params.id});
        //console.log(customer)
        res.render("customer/view" , {customer});


    }catch(error){
        console.log(error);

    }
}


/* GET / edit customber data
*/

exports.edit = async (req,res) => {
    //console.log("entered the views page")
    try{
        const customer = await Customer.findOne({_id: req.params.id});
        //console.log(customer)
        res.render("customer/edit" , {customer});


    }catch(error){
        console.log(error);

    }
}

/* GET / update customber data
*/

// exports.editPost = async (req,res) => {
  
// try {

//     await Customer.findByIdAndUpdate(req.params.id,{
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         tel: req.body.tel,
//         email: req.body.email,
//         details: req.body.details,
//         updatedAt: Date.now()
//     });

//     res.redirect('/edit/${req.params.id}');
//     console.log("redirected");


// }catch(error){
//     console.log(error);
// }

// }
exports.editPost = async (req, res) => {
    try {
      // Use the Customer model to find and update the customer's information by ID
      await Customer.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details,
        updatedAt: Date.now()
      });
  
      // Redirect to the "edit" page for the same customer
      res.redirect(`/edit/${req.params.id}`);
    //   console.log("redirected");
    } catch (error) {
      console.log(error);
    }
  };
  

  /* delete / delete customber data
*/

exports.deleteCustomer = async (req, res) => {
    try {
      // Delete the customer record using the Customer model
      await Customer.deleteOne({ _id: req.params.id });
  
      // Redirect to the homepage or a relevant page
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  

 
/**
 * Get /
 * Search Customer Data 
*/
exports.searchCustomers = async (req, res) => {
  
    try {
      // Get the search term from the request body
      let searchTerm = req.body.searchTerm;
  
      // Remove special characters from the search term
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      // Search for customers based on first name or last name using regular expressions
      const customers = await Customer.find({
        $or: [
          { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
          { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        ]
      });
  
      // Render the "search" view with the search results and local variables
      res.render("search", {
        customers
      });
      
    } catch (error) {
      console.log(error);
    }
  };
  