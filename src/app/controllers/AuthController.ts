import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../models/User'
import { compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repo = getRepository(User)
    const { email, password } = req.body

    const user = await repo.findOne({ where: { email } })

    if (!user) return res.status(404).send({ message: 'This user not found.' })

    const isValidPassword = compareSync(password, user.password)

    if (!isValidPassword) return res.sendStatus(401)

    const token = jwt.sign({ id: user.id }, `secret`, { expiresIn: '1d' })

    delete user.password

    return res.json({
      user,
      token,
    })
  }
}

export default new AuthController()
