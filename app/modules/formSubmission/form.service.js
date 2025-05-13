const FormSubmission = require("./form.schema");
const notificationService = require("../notification/notification.service");
//notification controller
const submitForm = async (formData, userId) => {
  const newForm = await FormSubmission.create({ ...formData, userId });

  await notificationService.createNotification(
    formData.schoolId,
    "New Form Submitted",
    "A parent/student submitted a new application form.",
    "alert"
  );

  return newForm;
};
//trigger notification of form 
/*

here is the logic call on vcreate notification
*/



const getFormsBySchoolId = async (schoolId) => {
  console.log(schoolId)
  return await FormSubmission.find({ schoolId }).select("-schoolId -userId").exec();
};


module.exports = { submitForm,getFormsBySchoolId };