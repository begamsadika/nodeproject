const defectTypeService = require('../services/defect_typeService');

async function getAllDefectTypes(req, res) {
  try {
    const defectTypes = await defectTypeService.getAllDefectTypes();
    res.status(200).json(defectTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports ={
    getAllDefectTypes
};
