import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication header required' })
  }
  const parts = authHeader.split(' ');
  const token = parts[1]
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export const checkRoleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'User is not authorized' })
      }

      const userRole = req.user.role

      if (!roles.includes(userRole)) {
        return res.status(403).json({
          message: `Access denied. Required role: ${roles.join(' or ')}`,
        })
      }

      next()
    } catch (e) {
      res.status(500).json({ message: 'Permission check error' })
    }
  }
}

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}
