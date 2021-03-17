
const auth={
    authenticate(jwt,name,cb){
        if(typeof window !== 'undefined')
        {
            localStorage.setItem(name,JSON.stringify(jwt));
        }

        cb();
    },

    isAuthenticated()
    {
        if(typeof window == 'undefined')
            return false;
        if(localStorage.getItem('jwt'))
            return JSON.parse(localStorage.getItem('jwt'));
        else
            return false;
    },
    clearJWT(name,cb)
    {
        if(typeof window !== 'undefined')
            localStorage.removeItem(name);
        cb();
    },
    isDocAuthenticated()
    {
        if(typeof window == 'undefined')
        return false;
    if(localStorage.getItem('doc_jwt'))
        return JSON.parse(localStorage.getItem('doc_jwt'));
    else
        return false;
    },
    isAdminAuthenticated()
    {
        if(typeof window == 'undefined')
        return false;
    if(localStorage.getItem('admin_jwt'))
        return JSON.parse(localStorage.getItem('admin_jwt'));
    else
        return false;
    }

}

export default auth;