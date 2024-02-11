require('dotenv').config({ path: '../.env' })

const mongoose = require('mongoose');
const Station = require('./Station');

const stations = [
    {
        "stationId": 1,
        "stationName": "Chandler Fire Station No.1",
        "address": "1491 E Pecos Rd, Chandler, AZ 85225",
        "latitude": 33.29095993606609,
        "longitude": -111.81659271582987
    },
    {
        "stationId": 2,
        "stationName": "Chandler Fire Station No.2",
        "address": "1911 N Alma School Rd, Chandler, AZ 85225",
        "latitude": 33.33285623972869,
        "longitude": -111.85835631290857
    },
    {
        "stationId": 3,
        "stationName": "Chandler Fire Station No.3",
        "address": "275 S Ellis Rd, Chandler, AZ 85224",
        "latitude": 33.29937146804495,
        "longitude": -111.88492249544954
    },
    {
        "stationId": 4,
        "stationName": "Chandler Fire Station No.4",
        "address": "295 N Kyrene Rd, Chandler, AZ 85226",
        "latitude": 33.30716702817265,
        "longitude": -111.94504188401982
    },
    {
        "stationId": 5,
        "stationName": "Chandler Fire Station No.5",
        "address": "1775 W Queen Creek Rd, Chandler, AZ 85248",
        "latitude": 33.26125493686143,
        "longitude": -111.87145296289836
    },
    {
        "stationId": 6,
        "stationName": "Chandler Fire Station No.6",
        "address": "911 N Jackson St, Chandler, AZ 85225",
        "latitude": 33.31956707904414,
        "longitude": -111.82802004531655
    },
    {
        "stationId": 7,
        "stationName": "Chandler Fire Station No.7",
        "address": "6200 S Gilbert Rd, Chandler, AZ 85249",
        "latitude": 33.21602910518005,
        "longitude": -111.79002681134637
    },
    {
        "stationId": 8,
        "stationName": "Chandler Fire Station No.8",
        "address": "711 W Frye Rd, Chandler, AZ 85225",
        "latitude": 33.29842302067967,
        "longitude": -111.85131526979484
    },
    {
        "stationId": 9,
        "stationName": "Chandler Fire Station No.9",
        "address": "211 N Desert Breeze Blvd, Chandler, AZ 85226",
        "latitude": 33.306354940376536,
        "longitude": -111.91940277142102
    },
    {
        "stationId": 10,
        "stationName": "Chandler Fire Station No.10",
        "address": "5211 S McQueen Rd, Chandler, AZ 85249",
        "latitude": 33.23035376774228,
        "longitude": -111.82331242572242
    },
    {
        "stationId": 11,
        "stationName": "Chandler Fire Station No.11",
        "address": "4200 S Gilbert Rd, Chandler, AZ 85249",
        "latitude": 33.24480946782845,
        "longitude": -111.79040141987805
    },
    {
        "stationId": 12,
        "stationName": "Gilbert Fire Station No.1",
        "address": "2730 E. Williams Field Road Gilbert, AZ 85295",
        "latitude": 33.3074116458481,
        "longitude": -111.731394835201
    },
    {
        "stationId": 13,
        "stationName": "Gilbert Fire Station No.2",
        "address": "2855 E Guadalupe Rd Gilbert, AZ 85234",
        "latitude": 33.3644212297267,
        "longitude": -111.727692518255
    },
    {
        "stationId": 14,
        "stationName": "Gilbert Fire Station No.3",
        "address": "1011 E. Guadalupe Rd Gilbert, AZ 85234",
        "latitude": 33.3642185849847,
        "longitude": -111.769306372508
    },
    {
        "stationId": 15,
        "stationName": "Gilbert Fire Station No.4",
        "address": "909 E. Ray Road Gilbert, AZ 85296",
        "latitude": 33.3207184956398,
        "longitude": -111.770860977537
    },
    {
        "stationId": 16,
        "stationName": "Gilbert Fire Station No.5",
        "address": "3630 E. Germann Road Gilbert, AZ 85297",
        "latitude": 33.2781672311346,
        "longitude": -111.709625594595
    },
    {
        "stationId": 17,
        "stationName": "Gilbert Fire Station No.6",
        "address": "3595 E. Warner Road Gilbert, AZ 85296",
        "latitude": 33.3353015282581,
        "longitude": -111.712133142109
    },
    {
        "stationId": 18,
        "stationName": "Gilbert Fire Station No.7",
        "address": "625 W. Warner Rd. Gilbert, AZ 85233",
        "latitude": 33.3349770547749,
        "longitude": -111.803182839538
    },
    {
        "stationId": 19,
        "stationName": "Gilbert Fire Station No.8",
        "address": "1095 East Germann Road Gilbert, AZ 85297",
        "latitude": 33.2772086961984,
        "longitude": -111.764767827368
    },
    {
        "stationId": 20,
        "stationName": "Gilbert Fire Station No.9",
        "address": "3355 E Ocotillo Rd Gilbert, AZ 85298",
        "latitude": 33.2480397477354,
        "longitude": -111.717155844125
    },
    {
        "stationId": 21,
        "stationName": "Gilbert Fire Station No.10",
        "address": "1330 West Guadalupe Road Gilbert, AZ 85233",
        "latitude": 33.3647745805191,
        "longitude": -111.818687402101
    },
    {
        "stationId": 22,
        "stationName": "Gilbert Fire Station No.11",
        "address": "2860 East Riggs Road Gilbert, AZ 85298",
        "latitude": 33.2197747223465,
        "longitude": -111.727652625875
    },
    {
        "stationId": 201,
        "stationName": "Mesa Fire Station No.201",
        "address": "360 E 1st St, Mesa, AZ 85201",
        "latitude": 33.41764314071367,
        "longitude": -111.82347154775258
    },
    {
        "stationId": 202,
        "stationName": "Mesa Fire Station No.202",
        "address": "830 S Stapley Dr, Mesa, AZ 85204",
        "latitude": 33.399868981355155,
        "longitude": -111.80603149016272
    },
    {
        "stationId": 203,
        "stationName": "Mesa Fire Station No.203",
        "address": "324 S Alma School Rd, Mesa, AZ 85202",
        "latitude": 33.408747351031806,
        "longitude": -111.85731291449936
    },
    {
        "stationId": 204,
        "stationName": "Mesa Fire Station No.204",
        "address": "1426 S Ext Rd, Mesa, AZ 85210",
        "latitude": 33.38937054497742,
        "longitude": -111.84907371662932
    },
    {
        "stationId": 205,
        "stationName": "Mesa Fire Station No.205",
        "address": "730 S Greenfield Rd, Mesa, AZ 85206",
        "latitude": 33.40197360962213,
        "longitude": -111.73680311600422
    },
    {
        "stationId": 206,
        "stationName": "Mesa Fire Station No.206",
        "address": "815 N Lindsay Rd, Mesa, AZ 85213",
        "latitude": 33.430408419334164,
        "longitude": -111.77056298764798
    },
    {
        "stationId": 207,
        "stationName": "Mesa Fire Station No.207",
        "address": "2505 S Dobson Rd, Mesa, AZ 85202",
        "latitude": 33.370272688311054,
        "longitude": -111.87901193555203
    },
    {
        "stationId": 208,
        "stationName": "Mesa Fire Station No.208",
        "address": "4530 E McKellips Rd, Mesa, AZ 85215",
        "latitude": 33.45243102157953,
        "longitude": -111.7332485332983
    },
    {
        "stationId": 209,
        "stationName": "Mesa Fire Station No.209",
        "address": "7035 E Southern Ave, Mesa, AZ 85209",
        "latitude": 33.39299317461608,
        "longitude": -111.67930170632334
    },
    {
        "stationId": 210,
        "stationName": "Mesa Fire Station No.210",
        "address": "1502 S 24th St, Mesa, AZ 85204",
        "latitude": 33.38871428712993,
        "longitude": -111.78025726884844
    },
    {
        "stationId": 211,
        "stationName": "Mesa Fire Station No.211",
        "address": "2130 N Horne, Mesa, AZ 85203",
        "latitude": 33.45330985984842,
        "longitude": -111.81402472554727
    },
    {
        "stationId": 212,
        "stationName": "Mesa Fire Station No.212",
        "address": "2430 S Ellsworth Rd, Mesa, AZ 85209",
        "latitude": 33.37156791162218,
        "longitude": -111.63723438541842
    },
    {
        "stationId": 213,
        "stationName": "Mesa Fire Station No.213",
        "address": "7816 E University Dr, Mesa, AZ 85207",
        "latitude": 33.42273254416545,
        "longitude": -111.66261656285319
    },
    {
        "stationId": 214,
        "stationName": "Mesa Fire Station No.214",
        "address": "5950 E Virginia St, Mesa, AZ 85215",
        "latitude": 33.477619972145526,
        "longitude": -111.70189983610162
    },
    {
        "stationId": 215,
        "stationName": "Mesa Fire Station No.215",
        "address": "6353 S Downwind Cir, Mesa, AZ 85212",
        "latitude": 33.30153857414937,
        "longitude": -111.66071909335261
    },
    {
        "stationId": 216,
        "stationName": "Mesa Fire Station No.216",
        "address": "7966 E McDowell Rd, Mesa, AZ 85207",
        "latitude": 33.46657518801757,
        "longitude": -111.65898847577986
    },
    {
        "stationId": 217,
        "stationName": "Mesa Fire Station No.217",
        "address": "10434 E Baseline Rd, Mesa, AZ 85209",
        "latitude": 33.379594875185916,
        "longitude": -111.6060585701965
    },
    {
        "stationId": 218,
        "stationName": "Mesa Fire Station No.218",
        "address": "845 N Alma School Rd, Mesa, AZ 85201",
        "latitude": 33.430576122315784,
        "longitude": -111.85555547593587
    },
    {
        "stationId": 219,
        "stationName": "Mesa Fire Station No.219",
        "address": "3361 S Signal Butte Rd, Mesa, AZ 85212",
        "latitude": 33.353470963574246,
        "longitude": -111.60048967509363
    },
    {
        "stationId": 220,
        "stationName": "Mesa Fire Station No.220",
        "address": "32 S 58th St, Mesa, AZ 85205",
        "latitude": 33.41492580358734,
        "longitude": -111.70567354774543
    },
    {
        "stationId": 221,
        "stationName": "Mesa Fire Station No.221",
        "address": "9320 E Point Twenty-Two Blvd, Mesa, AZ 85212",
        "latitude": 33.32680626321322,
        "longitude": -111.63264990224569
    }
];

// Mesa Fire Station No.201 / 360 E 1st St, Mesa, AZ 85201 / 33.41764314071367, -111.82347154775258
// Mesa Fire Station No.202 / 830 S Stapley Dr, Mesa, AZ 85204 / 33.399868981355155, -111.80603149016272
// Mesa Fire Station No.203 / 324 S Alma School Rd, Mesa, AZ 85202 / 33.408747351031806, -111.85731291449936
// Mesa Fire Station No.204 / 1426 S Ext Rd, Mesa, AZ 85210 / 33.38937054497742, -111.84907371662932
// Mesa Fire Station No.205 / 730 S Greenfield Rd, Mesa, AZ 85206 / 33.40197360962213, -111.73680311600422
// Mesa Fire Station No.206 / 815 N Lindsay Rd, Mesa, AZ 85213 / 33.430408419334164, -111.77056298764798
// Mesa Fire Station No.207 / 2505 S Dobson Rd, Mesa, AZ 85202 / 33.370272688311054, -111.87901193555203
// Mesa Fire Station No.208 / 4530 E McKellips Rd, Mesa, AZ 85215 / 33.45243102157953, -111.7332485332983
// Mesa Fire Station No.209 / 7035 E Southern Ave, Mesa, AZ 85209 / 33.39299317461608, -111.67930170632334
// Mesa Fire Station No.210 / 1502 S 24th St, Mesa, AZ 85204 / 33.38871428712993, -111.78025726884844
// Mesa Fire Station No.211 / 2130 N Horne, Mesa, AZ 85203 / 33.45330985984842, -111.81402472554727
// Mesa Fire Station No.212 / 2430 S Ellsworth Rd, Mesa, AZ 85209 / 33.37156791162218, -111.63723438541842
// Mesa Fire Station No.213 / 7816 E University Dr, Mesa, AZ 85207 / 33.42273254416545, -111.66261656285319
// Mesa Fire Station No.214 / 5950 E Virginia St, Mesa, AZ 85215 / 33.477619972145526, -111.70189983610162
// Mesa Fire Station No.215 / 6353 S Downwind Cir, Mesa, AZ 85212 / 33.30153857414937, -111.66071909335261
// Mesa Fire Station No.216 / 7966 E McDowell Rd, Mesa, AZ 85207 / 33.46657518801757, -111.65898847577986
// Mesa Fire Station No.217 / 10434 E Baseline Rd, Mesa, AZ 85209 / 33.379594875185916, -111.6060585701965
// Mesa Fire Station No.218 / 845 N Alma School Rd, Mesa, AZ 85201 / 33.430576122315784, -111.85555547593587
// Mesa Fire Station No.219 / 3361 S Signal Butte Rd, Mesa, AZ 85212 / 33.353470963574246, -111.60048967509363
// Mesa Fire Station No.220 / 32 S 58th St, Mesa, AZ 85205 / 33.41492580358734, -111.70567354774543
// Mesa Fire Station No.221 / 9320 E Point Twenty-Two Blvd, Mesa, AZ 85212 / 33.32680626321322, -111.63264990224569

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