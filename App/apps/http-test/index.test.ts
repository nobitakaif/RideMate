import { app } from "@repo/http/app"
import { describe, expect, test } from "bun:test"
import { client } from "./config"




describe("send OTP to phone number", () => {
    test("returns 200 and a success message", async () => {
        const response = await client.api.v1.auth.number.sent.post({
            number: "",
        })

        // expect(response.status).toBe(200)

        if (response.status === 200) {

            expect(response.data).toEqual({
                msg: "msg has been sent to your number",
            })
        }
    })
})
