const  Logout = () => {
    localStorage.clear();
    window.location.href = window.location.origin + "/";
}

export default Logout;