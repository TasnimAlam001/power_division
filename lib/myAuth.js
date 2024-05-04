
"use server";

const checkAuth = () => {
    return true;
}

const login = async (email, password) => {
    console.log("Email:", email);
    console.log("Password:", password);

    // 1 - post data to api and create session


    // 2 - if success, return user data else return null

}


export {
    checkAuth,
    login
}