/////
/// PORT
///
process.env.PORT = process.env.PORT || 3000;




// =====================================
// Expire of the token
//======================================

process.env.EXPIRETOKEN = 60 * 60 * 24 * 30;


// =====================================
//Seed of athi
//======================================

process.env.SEED = process.env.SEED || 'secret-este-es-el-seed-desarrollo';




// =====================================
//Desarrollo
//======================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =====================================
//base de Datos
//======================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI;
}


process.env.URLDB = urlDB;