import JWR from "../src";

const jwr = new JWR({secret: "9N7-XL7epZh6#AAgMc%_2N9*-w?%Gm48z"});

describe("JWT Native suite", () => {
    describe("JWT Payload", () => {
        it('should transform empty payload to object', function () {
            const data = '';
            const payload = jwr.handlePayload(data);
            expect(payload).toBeDefined();
            expect(typeof payload).toBe("object");
            expect(payload.jwr_objectified).toBeTruthy();
            expect(payload.data).toEqual(data);
        });
        it('should transform null payload to object', function () {
            const data = null;
            const payload = jwr.handlePayload(data);
            expect(payload).toBeDefined();
            expect(typeof payload).toBe("object");
            expect(payload.jwr_objectified).toBeTruthy();
            expect(payload.data).toEqual(data);
        });
        it('should transform array payload to object', function () {
            const data = [1, 2, 3, 4];
            const payload = jwr.handlePayload(data);
            expect(payload).toBeDefined();
            expect(typeof payload).toBe("object");
            expect(payload.jwr_objectified).toBeTruthy();
            expect(payload.data).toEqual(data);
        });
        it('should keep payload as is for object', function () {
            const data = {name: "Christian"};
            const payload = jwr.handlePayload(data);
            expect(payload).toBeDefined();
            expect(typeof payload).toBe("object");
            expect(payload.jwr_objectified).toBeUndefined();
            expect(payload).toEqual(data);
        });
    });

    describe("JWT Signing", () => {
        it('it should return a token when signing payload', () => {
            const payload = {id: 12321, name: "Christian", role: "user"};
            const token = jwr.sign(payload);
            expect(token).toBeDefined();
            expect(typeof token).toBe("string");
        });
    });

    describe("JWT Decode", () => {
        it('it should return payload of type object for a token', async () => {
            const payload = {id: 12321, name: "Christian", active: true};
            const token = await jwr.sign(payload);
            const data = await jwr.decode(token);
            expect(data).toBeDefined();
            expect(data.id).toEqual(payload.id);
            expect(data.name).toEqual(payload.name);
            expect(data.active).toEqual(payload.active);
        });
        it('it should return payload of type string for a token', async () => {
            const payload = "Christian";
            const token = await jwr.sign(payload);
            const data = await jwr.decode(token);
            expect(data).toBeDefined();
            expect(data).toEqual(payload)
        });
    });

    describe("JWT Verify", () => {
        it('it should return payload for a valid token', async () => {
            const payload = {id: 12321, name: "Christian", active: true};
            const token = await jwr.sign(payload);
            const data = await jwr.verify(token);
            expect(data).toBeDefined();
            expect(data.id).toEqual(payload.id);
            expect(data.name).toEqual(payload.name);
            expect(data.active).toEqual(payload.active);
        });
        it('it should throw a crypto error for an invalid/malformed token', async () => {
            try {
                const invalidToken = 'aslkdnfln32k4no110rjfdisan';
                const data = await jwr.verify(invalidToken);
            } catch (e) {
                expect(() => {
                    e.toThrow(TypeError)
                });
            }
        });
    });

});
