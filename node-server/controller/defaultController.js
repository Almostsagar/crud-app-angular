const { Employee } = require("../model/employeemodel");

module.exports.index = async (req, res) => {
  const emps = await Employee.find({});
  try {
    res.send(emps);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.addEmployees = async (req, res, next) => {
  const emps = new Employee(req.body);
  try {
    await emps.save();
    // res.send({"done":"ok"});
    next()
  } catch (error) {
    res.status(500).send(error);
  }
  console.log(req.body);
};

module.exports.updateEmployees = async (req, res, next) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    await Employee.save();
    // res.send({"done":"ok"});
    next()
  } catch (error) {
    res.status(500).send(error);
  }
  console.log(req.body);
};

module.exports.removeEmployees = async (req, res) => {
    try {
      
        const emps = await Employee.findByIdAndDelete(req.params.id);
    
        if (!emps) res.status(404).send("No item found");
        res.status(200).send();
      } catch (error) {
        res.status(500).send(error);
      }
  console.log(req.body);
};
