function validateEmail(emailUsuario) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailUsuario);
}

module.exports = validateEmail;