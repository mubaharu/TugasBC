const assert = require ('assert')
const { expect } = require('chai')
const url = "https://reqres.in/"

describe('Metode Get', function () {
    it("Get List User With Fetch", async function () {
        const response = await fetch(url+"api/users?page=2")
        const data = await response.json()
        console.log(data)

        assert.strictEqual(response.status, 200)
        assert.strictEqual(data.data[1].id, 8)
        
    })
    it("Get List User Chai", async function () {
        const response = await fetch(url+"api/users?page=2")
        const data = await response.json()
        // console.log(data)

        // assert.typeOf(data.data[2].id, 'number')
        expect(data.data[2].first_name).to.equal('Tobias')
        expect(data.data[2].first_name).to.be.a('string')
        
    })
})