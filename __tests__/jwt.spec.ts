import JWR from "../src";
const jwr = new JWR({secret: "9N7-XL7epZh6#AAgMc%_2N9*-w?%Gm48z"});

describe("JWT Native suite", () => {
    test('it should return a token when signing payload', () => {
        const payload = {id: 12321, name: "Christian", role: "user"};
        const token = jwr.sign(payload);
        expect(token).toBeDefined();
        expect(typeof token).toBe("string");
    });
});
