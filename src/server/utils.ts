export const getIpAddress = (req) => {
  const ipAddresses = req.headers["x-forwarded-for"].split(",");
  const [ firstIpAddress ] = ipAddresses;
  const { remoteAddress } = req.connection
  
  return firstIpAddress || remoteAddress;
}