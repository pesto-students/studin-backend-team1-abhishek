
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'secret-key-for-jwt-signing-use-from-config-file', {
        expiresIn: maxAge
    });
}