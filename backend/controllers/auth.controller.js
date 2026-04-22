import * as authService from '../services/auth.service.js'

export const register = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await authService.register(email, password)
    res.status(201).json({ id: user.id, email: user.email })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const { accessToken, refreshToken, user } = await authService.login(
      email,
      password
    )
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    })
    res.json({ accessToken, user })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const refresh = async (req, res) => {
  try {
    const refreshTokenFromCookie = req.cookies.refreshToken
    if (!refreshTokenFromCookie) {
      return res.status(401).json({ message: 'Refresh token missing' })
    }
    const { accessToken, refreshToken, user } = await authService.refresh(
      refreshTokenFromCookie
    )
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    })

    res.json({ accessToken, user })
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired refresh token' })
  }
}

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies
    if (refreshToken) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        path: '/',
      })
    }
    return res.status(200).json({ message: 'Logout successful' })
  } catch (e) {
    console.log(e)
  }
}

export const me = async (req, res) => {
  try {
    const { email, password } = req.body
    const { user } = await authService.me(email, password)
    res.json({ user })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const setupAdmin = async (req, res) => {
  try {
    const admin = await authService.setupAdminService(req.body)

    res.status(201).json({
      message: 'Администратор создан',
      admin: { email: admin.email },
    })
  } catch (e) {
    res.status(e.status || 500).json({
      message: e.message || 'Ошибка сервера',
    })
  }
}
