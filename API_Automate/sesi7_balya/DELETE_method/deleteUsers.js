const { expect } = require('chai')
const url = "https://reqres.in/"

describe("Delete User", function () {
    it("Delete User Id 2", async function () {
        try {
            const del = await fetch(url+"api/users/2", {
                method: "DELETE",
                headers: {
                    "x-api-key": "reqres-free-v1"
                }   
            })

            if (!del.ok){
                // const data = await del.json()
                throw new Error(`HTTP error! status: ${del.status}`)
            }

            //Assertion
            if (del.status === 204){
                expect(del.status).to.equal(204)
                console.log("User with ID 2 Deleted Successfully")
            } 
        
        } catch(error) {
            console.error("Error Deleting User: ", error)
            throw error
        }
    })

})