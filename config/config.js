const config={
    env:process.env.NODE_ENV || 'development',
    port:process.env.PORT || 3000,
    jwtSecret:process.env.JWT_SECRET || 'abcdef-1234-@#$%',
   // mongoUri:process.env.MONGODB_URI || process.env.MONGO_HOST|| 'mongodb://'+(process.env.IP || 'localhost')+ ':'+(process.env.MONGO_PORT ||'27017')+'/vocalcovid',
    serviceID:"VA646c55489d6845dda65c8f58a2b8242f",
    accountSID:"ACaa0b65494dd195f89755e9a2abd780ef",
    authToken:"fa76794f61465d7cfe36df98f9f3347e",
    mongoUri:"mongodb+srv://pucho_db:znt66EFpFtiKIAOv@cluster0.2ssxl.mongodb.net/vocalcovid?retryWrites=true&w=majority"
}

export default config;