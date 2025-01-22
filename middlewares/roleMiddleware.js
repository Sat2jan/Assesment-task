export const protectAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); //user is an admin, proceed to the route handler
  } else {
    res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
};
