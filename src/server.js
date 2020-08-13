import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		cookieParser(),
		(req, res, next) => {
      const token = req.cookies['jwt-token']
      const user = token ? jwt.decode(token) : null

      return sapper.middleware({
        session: () => ({
					user,
					isAuth: !!user,
        })
      })(req, res, next)
    }
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
