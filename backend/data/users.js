import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Maja Majić',
        email: 'maja@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Ivo Ivić',
        email: 'ivo@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
];

export default users;