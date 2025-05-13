const formService = require("./form.service");
//require notification 
const submitForm = async (req, res) => {
  try {
      
    if (req.files) {
      req.body.documents = req.files.map(file => `/uploads/pdfs/${file.filename}`);
    }


    const submitted = await formService.submitForm(req.body, req.user._id);
    res.status(201).json(submitted);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const getFormsBySchool = async (req, res) => {
  try {
    const schoolId = req.user._id;

    const forms = await formService.getFormsBySchoolId(schoolId);

    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms by school ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//handle the req,res of the triggering of the notification
//try await submitform and then trigger
//or in submit form call on the notification trigger logic in form-service
module.exports = { submitForm,getFormsBySchool };