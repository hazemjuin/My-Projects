const Service = require("../models/service.model");
const User = require("../models/user.model")

const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

module.exports = {
  findAll: (req, res) => {
    Service.find()
      .populate("user") 
      .then((dbRes) => res.status(200).json(dbRes))
      .catch((dbErr) => res.status(400).json(dbErr));
  },

  findOne: (req, res) => {
    Service.findById(req.params.id).populate('user').populate('applicants').populate('selectedApplicant')
      .then((dbRes) => res.status(200).json(dbRes))
      .catch((dbErr) => res.status(400).json(dbErr));
  },

  create: async (req, res) => {
    try {
      const { id: userId } = jwt.verify(req.cookies.userToken, SECRET);
      console.log("🔥🔥🔥🔥🔥🔥", req.body, "🔥🔥🔥🔥🔥🔥");
  
      // Create a new service
      const newService = await Service.create({ ...req.body, user: userId });
  
      // Update the user's myServices array with the new service's ID
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { myServices: newService._id } },
        { new: true }
      );
  
      res.status(201).json({ newService, updatedUser });
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  
  update: (req, res) => {
    Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbRes) => res.status(200).json(dbRes))
      .catch((dbErr) => res.status(400).json(dbErr));
  },
  
  delete: (req, res) => {
    Service.findByIdAndDelete(req.params.id)
      .then((dbRes) => res.status(200).json(dbRes))
      .catch((dbErr) => res.status(400).json(dbErr));
  },

  // Applying For service
  applyToService: async (req, res) => {
    const { id: userId } = jwt.verify(req.cookies.userToken, SECRET);
    const serviceId = req.params.id;

    try {
      // Check if the user has already applied to the service
      const existingService = await Service.findById(serviceId);
      if (existingService.applicants.includes(userId)) {
        return res.status(400).json({ error: "User has already applied to this service." });
      }

      // Add the user's ID to the applicants array
      const updatedService = await Service.findByIdAndUpdate(
        serviceId,
        { $push: { applicants: userId } },
        { new: true }
      );

      res.status(200).json(updatedService);
    } catch (error) {
      res.status(400).json({ error: "Error applying to the service." });
    }
  },

  // Select Applicant

  selectApplicant: async (req, res) => {
    const { serviceId, applicantId } = req.params;

    try {
      // Check if the user making the request is the owner of the service
      const { id: userId } = jwt.verify(req.cookies.userToken, SECRET);
      const service = await Service.findById(serviceId);

      if (service.user.toString() !== userId) {
        return res.status(403).json({ error: "Permission denied. You are not the service owner." });
      }

      // Set the selectedApplicant field with the applicant's ID
      await Service.findByIdAndUpdate(
        serviceId,
        { selectedApplicant: applicantId, status: "ongoing" }, // Update status to "ongoing"
        { new: true }
      );

      res.status(200).json({ message: "Applicant selected and service marked as ongoing." });
    } catch (error) {
      res.status(400).json({ error: "Error selecting the applicant." });
    }
  },

  // Service Set as Completed 
  
  setServiceCompleted: async (req, res) => {
    const { serviceId } = req.params;

    try {
      // Check if the user making the request is the owner of the service
      const { id: userId } = jwt.verify(req.cookies.userToken, SECRET);
      const service = await Service.findById(serviceId);

      if (!service) {
        return res.status(404).json({ error: "Service not found." });
      }

      if (service.user.toString() !== userId) {
        return res.status(403).json({ error: "Permission denied. You are not the service owner." });
      }

      // Set the status of the service to "completed"
      await Service.findByIdAndUpdate(
        serviceId,
        { status: "completed" },
        { new: true }
      );

      res.status(200).json({ message: "Service marked as completed." });
    } catch (error) {
      res.status(400).json({ error: "Error marking the service as completed." });
    }
  },

  // List of Services By One User 

  findMyServices: async (req, res) => {
    const { id: userId } = jwt.verify(req.cookies.userToken, SECRET);
    try {
      const services = await Service.find({user :{$eq: userId}}).populate('user').populate("applicants")
      res.status(200).json(services)
    }
    catch {
      res.status(400).json(error)
    }
  }
  
};
