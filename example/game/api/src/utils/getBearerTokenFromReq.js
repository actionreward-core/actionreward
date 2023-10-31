export const getBearerTokenFromReq = (req) => {
  const authorizationHeader = req.headers['authorization'];

  if (authorizationHeader) {
    const tokenArray = authorizationHeader.split(' ');
    if (tokenArray.length === 2 && tokenArray[0] === 'Bearer') {
      return tokenArray[1]; // Extract the token
    }
  }

  return null;
}