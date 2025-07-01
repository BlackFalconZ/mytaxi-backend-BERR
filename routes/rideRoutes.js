const express = require('express');
const Ride = require('../models/Ride');

const router = express.Router();

// POST: Create a new ride
router.post('/', async (req, res) => {
  try {
    const { driver, origin, destination, date, seatsAvailable, price } = req.body;

    const ride = new Ride({
      driver,
      origin,
      destination,
      date,
      seatsAvailable,
      price,
      passengers: [] // initially empty
    });

    await ride.save();
    res.status(201).json({ msg: 'Ride created successfully', ride });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create ride', error: err.message });
  }
});

// GET: List all available rides
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find().populate('driver', 'name email');
    res.json(rides);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to get rides', error: err.message });
  }
});

module.exports = router;

// PUT: Book a ride by ride ID
router.put('/:id/book', async (req, res) => {
    try {
      const rideId = req.params.id;
      const { passengerId } = req.body;
  
      const ride = await Ride.findById(rideId);
  
      if (!ride) return res.status(404).json({ msg: 'Ride not found' });
  
      // Prevent overbooking
      if (ride.seatsAvailable <= 0) {
        return res.status(400).json({ msg: 'No seats available' });
      }
  
      // Prevent duplicate booking
      if (ride.passengers.includes(passengerId)) {
        return res.status(400).json({ msg: 'Passenger already booked this ride' });
      }
  
      // Add passenger and decrease seats
      ride.passengers.push(passengerId);
      ride.seatsAvailable -= 1;
  
      await ride.save();
  
      res.status(200).json({ msg: 'Ride booked successfully', ride });
    } catch (err) {
      res.status(500).json({ msg: 'Failed to book ride', error: err.message });
    }
  });
  