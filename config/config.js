const config={
    env:process.env.NODE_ENV || 'development',
    port:process.env.PORT || 3000,
    jwtSecret:process.env.JWT_SECRET || 'abcdef-1234-@#$%',
    mongoUri:process.env.MONGODB_URI || process.env.MONGO_HOST|| 'mongodb://'+(process.env.IP || 'localhost')+ ':'+(process.env.MONGO_PORT ||'27017')+'/vocalcovid',
    serviceID:process.env.serviceID,
    accountSID:process.env.accountSID,
    authToken:process.env.authToken,
    emailFrom:"ravi.kumar8927395664@gmail.com",
    password:"Ravi@8927"
}

export default config;

//MONGODB_URI=mongodb+srv://pucho_db:znt66EFpFtiKIAOv@cluster0.2ssxl.mongodb.net/vocalcovid?retryWrites=true&w=majority