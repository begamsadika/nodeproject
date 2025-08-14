const DefectType = require('../models/defect_type');

const getAllDefectTypes =async() =>{
    return await DefectType.findAll();
};

module.exports ={
    getAllDefectTypes

}
