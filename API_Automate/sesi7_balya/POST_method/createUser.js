const { expect } = require('chai')
const Ajv = require("ajv")
const ajv = new Ajv({ allErrors: true }) // aktifkan semua error
const url = "https://reqres.in/"

describe("Add New User", function () {
    it("Input User Bio", async function () {
        const response = await fetch(url+"api/users", {
            method: "POST",
            headers: {
                "x-api-key": "reqres-free-v1",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "Xabi",
                age: 37,
                job: "Coach"
            }),
        })

        const data = await response.json()
        const schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Generated schema for Root",
        "type": "object",
        "properties": {
            "name": {
            "type": "string"
            },
            "age": {
            "type": "number"
            },
            "job": {
            "type": "string"
            }
        },
        "required": [
            "name",
            "age",
            "job"
        ]
        }

        const validate = ajv.compile(schema)
        const isValid = validate(data)

        // console.log(data)        
        // expect(data).to.have.property("name")
        // Assertion
        if (!isValid) {
        console.error("Schema validation errors:", validate.errors)
        }
        expect(response.status).to.equal(201)
        expect(isValid, JSON.stringify(validate.errors, null,2)).to.be.true;
        
    })

    it("Error 400 Register New Member", async function () {
        const startTime = process.hrtime.bigint()
        const regist = await fetch(url+"api/register", {
            method: "POST",
            headers: {
                "x-api-key": "reqres-free-v1",
                "Content-Type": "application/json"
            },
            body: JSON.stringify ({
                email: "xabi@wowmail.com"
            }),
        })
        
        const rData = await regist.json()
        const endTime = Number(process.hrtime.bigint() - startTime) / 1_000_000 //hitung respon time sebagai milisecond
        
        // Assertion
        expect(regist.status).to.equal(400)
        expect(endTime).to.be.below(350)

        console.log(rData)
        console.log('Case-2, Respontime : '+ Math.round(endTime) +'ms')
        
    })

})