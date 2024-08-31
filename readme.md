API ENDPOINTS:


1.POST /api/v1/Add_Hall
    Add a new hall

2.GET /api/v1
    Default homepage of the hall booking api

3.GET /api/v1/Hall_List
    Displays the list of halls (includes both the booked as well as the not booked halls )

4.GET /api/v1/Bookings_Data
    Displays the list of booking data for all the halls

5.GET /api/v1/Hall/:id
    Displays data about a specific hall using the hall id

6.GET /api/v1/Repeated_Bookings_Data
    Displays how many times a user has booked a hall

7.PUT /api/v1/Hall/:id
    Book a hall using the hall id

8.DELETE /api/v1/Delete_Hall/:id
    Delete a hall with the hall id