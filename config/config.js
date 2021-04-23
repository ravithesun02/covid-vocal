const config={
    env:process.env.NODE_ENV || 'development',
    port:process.env.PORT || 80,
    jwtSecret:process.env.JWT_SECRET || 'abcdef-1234-@#$%',
    mongoUri:process.env.MONGODB_URI || process.env.MONGO_HOST|| 'mongodb://'+(process.env.IP || 'localhost')+ ':'+(process.env.MONGO_PORT ||'27017')+'/vocalcovid',
    serviceID:process.env.serviceID,
    accountSID:process.env.accountSID,
    authToken:process.env.authToken,
    emailFrom:"pucho-covid19.trials@pucho.ai",
    password:"0L5p3EJF8iL3",
     firebaseConfig : {
        apiKey: "AIzaSyBAt4f7uMKcZ6IZtDKooqctg03g2Gqmt_Q",
        authDomain: "pucho-life-sciences-inc.firebaseapp.com",
        projectId: "pucho-life-sciences-inc",
        storageBucket: "pucho-life-sciences-inc.appspot.com",
        messagingSenderId: "532383597848",
        appId: "1:532383597848:web:4ec0e0a064c7b04b898a6d",
        measurementId: "G-L6MCXEW9K6"
      },
    GCP_KEY:"AIzaSyBAt4f7uMKcZ6IZtDKooqctg03g2Gqmt_Q"
}

export default config;

//MONGODB_URI=mongodb+srv://pucho_db:znt66EFpFtiKIAOv@cluster0.2ssxl.mongodb.net/vocalcovid?retryWrites=true&w=majority