import cookie from 'cookie'
import jwt from 'jsonwebtoken'

export function post(req, res) {
	const user = {
		username: 'iamyuu'
	}

	const expiresIn = 60 * 60 * 24 * 7
  const jwtToken = jwt.sign(user, 'secret', { expiresIn })

	const token = cookie.serialize('jwt-token', jwtToken, {
		httpOnly: true,
		maxAge: expiresIn
	})

	res.writeHead(200, {
		'Content-Type': 'application/json',
		'Set-Cookie': token
	})

	res.end(JSON.stringify({ user, token: jwtToken }))
}
