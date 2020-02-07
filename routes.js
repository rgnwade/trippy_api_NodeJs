'use strict';

module.exports = function(app) {
    var todoList = require('./controller');


     //Routes for Secure API (token)
    app.route('/login')
     .post(todoList.loginUser);


    //Routes for Get Data 
    app.route('/')
        .get(todoList.index);

    app.route('/get-all-users')
        .get(todoList.users);

    app.route('/get-all-admin')
        .get(todoList.admin);

    app.route('/roles')
        .get(todoList.roles);

    app.route('/articles')
        .get(todoList.articles);
    
    app.route('/category')
        .get(todoList.category);

    app.route('/sub-category')
        .get(todoList.sub_category);

    app.route('/comments')
        .get(todoList.comments);

    app.route('/service-provider')
        .get(todoList.service_provider);

    app.route('/subscribe')
        .get(todoList.subscribe);


    //Routes for Search Data     
    app.route('/users/:user_id')
        .get(todoList.findUsers);



     //Routes for Post/Create Data 
    app.route('/create-users')
        .post(todoList.createUsers);



     //Routes for Update Data 
    app.route('/users')
        .put(todoList.updateUsers);



     //Routes for Delete Data 
    app.route('/users')
        .delete(todoList.deleteUsers);
};