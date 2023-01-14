

const fetchUser = () => {
    return localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null
} 

export default fetchUser;