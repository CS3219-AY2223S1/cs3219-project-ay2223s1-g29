import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(403).send('A token is required for authentication');
  }
  const token = auth.split(' ')[1];
  try {
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    req.params.username = decodedToken.username;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

export { verifyToken as default };
