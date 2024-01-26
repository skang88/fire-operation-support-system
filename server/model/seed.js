require('dotenv').config({ path: '../.env' })

const mongoose = require('mongoose');
const Station = require('./Station');

const stations = [
    {
        stationId: 1,
        stationName: 'Chandler Fire Department Station No.1',
        address: '1491 E Pecos Rd, Chandler, AZ 85225',
        latitude: 33.29095993606609,
        longitude: -111.81659271582987,
    },
    {
        stationId: 2,
        stationName: 'Chandler Fire Department Station No.2',
        address: '1911 N Alma School Rd, Chandler, AZ 85225',
        latitude: 33.33285623972869,
        longitude: -111.85835631290857,
    },
    {
        stationId: 3,
        stationName: 'Chandler Fire Department Station No.3',
        address: '275 S Ellis Rd, Chandler, AZ 85224',
        latitude: 33.29937146804495,
        longitude: -111.88492249544954,
    },
    {
        stationId: 4,
        stationName: 'Chandler Fire Department Station No.4',
        address: '295 N Kyrene Rd, Chandler, AZ 85226',
        latitude: 33.30716702817265,
        longitude: -111.94504188401982,
    },
    {
        stationId: 5,
        stationName: 'Chandler Fire Department Station No.5',
        address: '1775 W Queen Creek Rd, Chandler, AZ 85248',
        latitude: 33.26125493686143,
        longitude: -111.87145296289836,
    },
    {
        stationId: 6,
        stationName: 'Chandler Fire Department Station No.6',
        address: '911 N Jackson St, Chandler, AZ 85225',
        latitude: 33.31956707904414,
        longitude: -111.82802004531655,
    },
    {
        stationId: 7,
        stationName: 'Chandler Fire Department Station No.7',
        address: '6200 S Gilbert Rd, Chandler, AZ 85249',
        latitude: 33.21602910518005,
        longitude: -111.79002681134637,
    },
    {
        stationId: 8,
        stationName: 'Chandler Fire Department Station No.8',
        address: '711 W Frye Rd, Chandler, AZ 85225',
        latitude: 33.29842302067967,
        longitude: -111.85131526979484,
    },
    {
        stationId: 9,
        stationName: 'Chandler Fire Department Station No.9',
        address: '211 N Desert Breeze Blvd, Chandler, AZ 85226',
        latitude: 33.306354940376536,
        longitude: -111.91940277142102,
    },
    {
        stationId: 10,
        stationName: 'Chandler Fire Department Station No.10',
        address: '5211 S McQueen Rd, Chandler, AZ 85249',
        latitude: 33.23035376774228,
        longitude: -111.82331242572242,
    },
    {
        stationId: 11,
        stationName: 'Chandler Fire Department Station No.11',
        address: '4200 S Gilbert Rd, Chandler, AZ 85249',
        latitude: 33.24480946782845,
        longitude: -111.79040141987805,
    },
    {
        stationId: 12,
        stationName: 'Gilbert Fire Department Station No.1',
        address: '2730 E. Williams Field Road Gilbert, AZ 85295',
        latitude: 33.3074116458481,
        longitude: -111.731394835201,
    },
    {
        stationId: 13,
        stationName: 'Gilbert Fire Department Station No.2',
        address: '2855 E Guadalupe Rd Gilbert, AZ 85234',
        latitude: 33.3644212297267,
        longitude: -111.727692518255,
    },
    {
        stationId: 14,
        stationName: 'Gilbert Fire Department Station No.3',
        address: '1011 E. Guadalupe Rd Gilbert, AZ 85234',
        latitude: 33.3642185849847,
        longitude: -111.769306372508,
    },
    {
        stationId: 15,
        stationName: 'Gilbert Fire Department Station No.4',
        address: '909 E. Ray Road Gilbert, AZ 85296',
        latitude: 33.3207184956398,
        longitude: -111.770860977537,
    },
    {
        stationId: 16,
        stationName: 'Gilbert Fire Department Station No.5',
        address: '3630 E. Germann Road Gilbert, AZ 85297',
        latitude: 33.2781672311346,
        longitude: -111.709625594595,
    },
    {
        stationId: 17,
        stationName: 'Gilbert Fire Department Station No.6',
        address: '3595 E. Warner Road Gilbert, AZ 85296',
        latitude: 33.3353015282581,
        longitude: -111.712133142109,
    },
    {
        stationId: 18,
        stationName: 'Gilbert Fire Department Station No.7',
        address: '625 W. Warner Rd. Gilbert, AZ 85233',
        latitude: 33.3349770547749,
        longitude: -111.803182839538,
    },
    {
        stationId: 19,
        stationName: 'Gilbert Fire Department Station No.8',
        address: '1095 East Germann Road Gilbert, AZ 85297',
        latitude: 33.2772086961984,
        longitude: -111.764767827368,
    },
    {
        stationId: 20,
        stationName: 'Gilbert Fire Department Station No.9',
        address: '3355 E Ocotillo Rd Gilbert, AZ 85298',
        latitude: 33.2480397477354,
        longitude: -111.717155844125,
    },
    {
        stationId: 21,
        stationName: 'Gilbert Fire Department Station No.10',
        address: '1330 West Guadalupe Road Gilbert, AZ 85233',
        latitude: 33.3647745805191,
        longitude: -111.818687402101,
    },
    {
        stationId: 22,
        stationName: 'Gilbert Fire Department Station No.11',
        address: '2860 East Riggs Road Gilbert, AZ 85298',
        latitude: 33.2197747223465,
        longitude: -111.727652625875,
    }
];


// mongoose connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('DB connection successful!');

        // deleting existing data
        return Station.deleteMany({});
    })
    .then(() => {
        console.log('Existing station data in the database has been deleted ');

        // saving station information
        return Station.insertMany(stations);
    })
    .then(() => {
        console.log('Initial station data has been saved to the database')
    })
    .catch(err => {
        console.log('DB connection failed!');
        console.log(err.message);
    })
    .finally(() => {
        mongoose.connection.close();
    });