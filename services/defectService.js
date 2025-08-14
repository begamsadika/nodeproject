const Defect = require('../models/defect');

const getAllDefects = async() =>{
    return await Defect.findAll();
};

module.exports ={
    getAllDefects

}
