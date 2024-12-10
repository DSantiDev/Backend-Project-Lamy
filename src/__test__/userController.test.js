const User = require('../models/User.model');
const { encryptedPassword } = require("../helpers/bcrypt.helper");
const mongoose = require ('mongoose')
const request = require('supertest')
const app = require('../index')


describe('Tests unitarios para el User Controller', () =>{
    beforeEach(async () => {
        await User.deleteMany({})
    }, 10000)
    afterAll(async ()=> {
        await User.deleteMany({})
        await mongoose.connection.close()
    })
    it('Deberia registrar un usuario que no existe en la base de datos', async () => {
        const name = "Juan"
        const lastname = "Jimenez"
        const username = "juan@juan.com"
        const password = "#Clave123"
        const phone = "3002564183"
        const address = "address"
        const response = await request(app)
                                .post('/api/auth/register')
                                .send({
                                    name : name,
                                    lastname : lastname,
                                    username : username,
                                    password : password,
                                    phone : phone,
                                    address : address                              
                                })
        expect(response.body).toHaveProperty('data')
        expect(response.body).toHaveProperty( 'ok', true)
        console.log(response.body.ok, response.body)
    }) 
    it('Deberia salir error al registar por el correo', async () => {
        const name = "Juan"
        const lastname = "Jimenez"
        const username = "juan"
        const password = "#Clave123"
        const phone = "3002564183"
        const address = "address"
        const response = await request(app)
                                .post('/api/auth/register')
                                .send({
                                    name : name,
                                    lastname : lastname,
                                    username : username,
                                    password : password,
                                    phone : phone,
                                    address : address                              
                                })
        expect(response.body).toHaveProperty('msg', 'El correo electrónico proporcionado no es válido.')
        expect(response.body).toHaveProperty( 'ok', false)
        console.log(response.body.ok, response.body)
    }) 
    it('Deberia salir error por que el correo ya esta registrado', async () => {
        const name = "Juan"
        const lastname = "Jimenez"
        const username = "juan@juan.co"
        const password = "#Clave123"
        const phone = "3002564183"
        const address = "address"
        const dbUser = new User({
                name : name,
                lastname : lastname,
                username : username,
                password : password,
                phone : phone,
                address : address   
        })
        await dbUser.save();
        const response = await request(app)
                                .post('/api/auth/register')
                                .send({
                                    name : name,
                                    lastname : lastname,
                                    username : username,
                                    password : password,
                                    phone : phone,
                                    address : address                              
                                })
        expect(response.body).toHaveProperty('msg', 'El usuario ya existe.')
        expect(response.body).toHaveProperty( 'ok', false)
        console.log(response.body.ok, response.body)
    }) 
    it('Deberia registrar un usuario que no existe en la base de datos', async () => {
        const name = "Juan"
        const lastname = "Jimenez"
        const username = "juan@juan.com"
        const password = "#Clave123"
        const phone = "3002564183"
        const address = "address"
        jest.spyOn(User, 'findOne').mockImplementationOnce( () => {
            throw new Error('Simulando error en base de datos')
        })
        const response = await request(app)
                                .post('/api/auth/register')
                                .send({
                                    name : name,
                                    lastname : lastname,
                                    username : username,
                                    password : password,
                                    phone : phone,
                                    address : address                              
                                })
        expect(response.body).toHaveProperty( 'msg', 'Error al registrar usuario')
        expect(response.body).toHaveProperty( 'ok', false)
        console.log(response.body.ok, response.body)
    }) 
    it('Se tiene que logear', async () => {
        const name = "Juan"
        const lastname = "Jimenez"
        const username = "juan1@juan.co"
        const password = "12345678"
        const phone = "3002564183"
        const address = "address"
        const dbUser = new User({
            name : name,
            lastname : lastname,
            username : username,
            password : password,
            phone : phone,
            address : address   
        })
        const hashedPassword = encryptedPassword(dbUser.password);
        dbUser.password = hashedPassword
        await dbUser.save()
        const response = await request(app)
                                .post('/api/auth/login')
                                .send({
                                    username: username,
                                    password: password
                                })
        expect(response.body).toHaveProperty("data")
        expect(response.body).toHaveProperty( 'ok', true)
        expect(response.body).toHaveProperty( 'token')
        console.log(response.body.ok, response.body, response.body.token)
    })
})