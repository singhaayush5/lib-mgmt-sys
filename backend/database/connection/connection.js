const mongoose = require('mongoose');

const connect = async () => {
    try{
        const connection = await mongoose.connect("mongodb+srv://aayushsingh504:poiuytrewq@test.nbl4l2n.mongodb.net/testingDB", {useNewUrlParser: true});
        console.log("Successfully connected to the database.");
    } catch (err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = connect;