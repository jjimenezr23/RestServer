/////
/// PORT
///
process.env.PORT = process.env.PORT || 3000;




// =====================================
// Expire of the token
//======================================

Process.env.EXPIRE_TOKEN = 60 * 60 * 24 * 30;


// =====================================
//Seed of athi
//======================================

Process.env.SEED = Process.env.EXPIRE_TOKEN || 'secret-este-es-el-seed-desarrollo';

// =====================================
//base de Datos
//======================================