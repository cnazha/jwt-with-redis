# jwt-with-redis

## Usage

```javascript
import JWR from "jwt-with-redis";
const jwr = new JWR({ secret: "longSecretKey" });

const payload = { name: "Christian" };

(async () => {


  // Adds token to redis and returns it
  const token = await jwr.addToken(payload);

  // Check token - retreives it from redis
  const data = await jwr.getToken(token);

  // Delete token
  await jwr.revokeToken(token); // 1

  // Check revoked token
  const invalidTokenData = await jwr.getToken(token); // null


})();
```

## Status

The Library is still in BETA phase.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
