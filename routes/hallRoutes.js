const express = require("express");
const router = express.Router();
const hallController = require("../controllers/hallController");

// Define routes
router.get("/Hall_List", hallController.getAllHalls);
router.get("/Hall/:id", hallController.getHallById);
router.get("/Bookings_Data", hallController.getAllBookings);
router.get("/Repeated_Bookings_Data", hallController.getRepeatedBookings);
router.post("/Add_Hall", hallController.addHall);
router.put("/Hall/:id", hallController.updateHall);
router.delete("/Delete_Hall/:id", hallController.deleteHall);

module.exports = router;
