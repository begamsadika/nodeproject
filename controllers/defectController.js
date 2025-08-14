const defectService = require('../services/defectService');

async function getAllDefects(req, res) {
    try {
        const defects = await defectService.getAllDefects();
        res.status(200).json(defects);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports ={
    getAllDefects
}