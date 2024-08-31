//hallList variable which holds all the information
let hallList = [
  {
    Room_Id: "1",
    Room_Name: "Room One",
    Seats_Available: "5",
    Amenities: "Bed,AC",
    Price_Per_Hour: "$70",
    Booking_Status: "Booked",
    Booking_Details: [
      {
        Customer_Name: "Mr.A",
        Date: "30/08/24",
        Start_Time: "9AM",
        End_Time: "9PM",
        Room_Id: "1",
        Room_Name: "Room One",
        Booking_Status: "Present",
      },
    ],
  },

  {
    Room_Id: "2",
    Room_Name: "Room Two",
    Seats_Available: "10",
    Amenities: "Desk,WiFi,Closet",
    Price_Per_Hour: "$100",
    Booking_Status: "Not Booked",
    Booking_Details: [
      {
        Customer_Name: "Mr.B",
        Date: "27/08/24",
        Start_Time: "9AM",
        End_Time: "9PM",
        Room_Id: "1",
        Room_Name: "Room Two",
        Booking_Status: "Past",
      },
    ],
  },
  {
    Room_Id: "3",
    Room_Name: "Room Three",
    Seats_Available: "15",
    Amenities: "Bed,Nightstand,TV,Telephone,Storage",
    Price_Per_Hour: "$200",
    Booking_Status: "Booked",
    Booking_Details: [
      {
        Customer_Name: "Mr.C",
        Date: "30/08/24",
        Start_Time: "9AM",
        End_Time: "9PM",
        Room_Id: "1",
        Room_Name: "Room Three",
        Booking_Status: "Present",
      },
    ],
  },
];

//hallController object
const hallController = {
  // GET all the halls
  getAllHalls: (req, res) => {
    console.log("HTTP GET METHOD TO GET ALL HALLS");
    res.json(hallList);
  },

  // GET a specific hall with id
  getHallById: (req, res) => {
    console.log("HTTP GET METHOD TO GET A HALL");
    const id = req.params.id;
    const hall = hallList.find((hall) => hall.Room_Id === id);

    if (hall) {
      res.json(hall);
    } else {
      res.status(404).json({ message: "The hall doesn't exist!" });
    }
  },

  // GET all the hall booking data
  getAllBookings: (req, res) => {
    console.log("HTTP GET METHOD TO GET ALL BOOKING DATA");
    const booking_details = hallList.flatMap((hall) => hall.Booking_Details);
    res.json({ booking_details });
  },

  // GET how many times a user has booked a hall
  getRepeatedBookings: (req, res) => {
    console.log("HTTP GET METHOD TO GET REPEATED BOOKINGS DATA BY CUSTOMER");

    const customerBookingData = {};

    hallList.forEach((hall) => {
      hall.Booking_Details.forEach((booking) => {
        const customerName = booking.Customer_Name;

        if (customerBookingData[customerName]) {
          customerBookingData[customerName].count += 1;
          customerBookingData[customerName].bookingDetails.push(booking);
        } else {
          customerBookingData[customerName] = {
            count: 1,
            bookingDetails: [booking],
          };
        }
      });
    });

    const repeatedBookingDetailsArray = Object.keys(customerBookingData).map(
      (customerName) => ({
        Customer_Name: customerName,
        Count: customerBookingData[customerName].count,
        Booking_Details: customerBookingData[customerName].bookingDetails,
      })
    );

    res.json(repeatedBookingDetailsArray);
  },

  // POST a new hall
  addHall: (req, res) => {
    console.log("HTTP POST METHOD TO POST A HALL");

    const hall_index_to_add = req.body.Room_Id;

    const hall_already_there = hallList.find(
      (hall) => hall.Room_Id === hall_index_to_add
    );

    if (hall_already_there === undefined) {
      const hall = req.body;
      hallList.push(hall);
      res.json(hall);
    } else {
      res.status(400).json({
        message: `Hall is already present with ${hall_index_to_add}! Please enter a new hall id!`,
      });
    }
  },

  // PUT a hall with id
  updateHall: (req, res) => {
    console.log("HTTP PUT METHOD TO UPDATE HALL");
    const id = req.params.id;

    const hall = hallList.find((hall) => hall.Room_Id === id);

    if (hall) {
      if (hall.Booking_Status === "Not Booked") {
        const new_hall_booking_info = {
          Customer_Name: req.body.Customer_Name,
          Date: req.body.Date,
          Start_Time: req.body.Start_Time,
          End_Time: req.body.End_Time,
          Room_Id: req.body.Room_Id,
          Room_Name: req.body.Room_Name,
          Booking_Status: req.body.Booking_Status,
        };

        hall.Booking_Details.push(new_hall_booking_info);
        hall.Booking_Status = "Booked";
        res.json(hall);
      } else {
        res.json({ message: `Hall ${id} is currently not available!` });
      }
    } else {
      res.status(404).json({ message: "The hall doesn't exist!" });
    }
  },

  // DELETE hall with id
  deleteHall: (req, res) => {
    console.log("HTTP DELETE METHOD TO DELETE A HALL");
    const id = req.params.id;
    const hallIndex = hallList.findIndex((hall) => hall.Room_Id === id);

    if (hallIndex != -1) {
      hallList.splice(hallIndex, 1);
      res.json({ message: `Hall ${id} deleted` });
    } else {
      res.status(404).json({ message: "The hall doesn't exist!" });
    }
  },
};

module.exports = hallController;
