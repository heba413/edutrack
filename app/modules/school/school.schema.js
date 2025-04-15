const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
       
   

},
{ timestamps: true }
)



const School = mongoose.model("School", SchoolSchema);

module.exports = School;