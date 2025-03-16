// export const SERVER_ENDPOINT = 'http://localhost:9817'
export const SERVER_ENDPOINT = "https://drip-pair-production.up.railway.app"
// Used to validate inputs before submitting any form
export const VALIDATION_REGEX = {
    firstName: new RegExp('[a-zA-Z]'),
    lastName: new RegExp('[a-zA-Z]'),
    username: new RegExp('[a-zA-Z][0-9!+,-./:;<=>?@]*'),
    email: new RegExp('^[a-zA-Z0-9.]{6,30}@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    password: new RegExp(
        '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!+,-./\\\\:;<=>?@#$%^&()_~`\'"]).{8,}$'
    ),
    phone: new RegExp('^\\+(?:[0-9] ?){6,14}[0-9]$'),
}
export const BRANDS_ID_NAME = [
    { id: 1, name: 'Nike' },
    { id: 2, name: 'Adidas' },
    { id: 3, name: 'Balenciaga' },
]
