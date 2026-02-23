const { expect } = require('chai')
const Ajv = require("ajv")
const ajv = new Ajv({ allErrors: true }) // aktifkan semua error
const url = "https://reqres.in/"

describe("Update Existing User", function () {
    it("Name Update", async function () {
        const upd = await fetch(url+"api/users/2", {
            method: "PATCH",
            headers: {
                "x-api-key": "reqres-free-v1",
                "Content-Type": "application/json"
            },
            body: JSON.stringify ({
                name: "Itadori",
                job: "Hunter"
            }),
        })

        const data = await upd.json()
        console.log(data)

        //Assertion
        expect(upd.status).to.equal(200, "status code equal to 200")
        expect(data).to.have.property("updatedAt")
        expect(data.name).to.have.lengthOf.is.above(5)
        
    })
})