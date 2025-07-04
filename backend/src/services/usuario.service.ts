import { UsuarioRepository } from '../repository/usuario.repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import createError from 'http-errors';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as string;
const CLIENT_URL = process.env.CLIENT_URL as string;

export class UsuarioService {
  private repo = new UsuarioRepository();

  private signToken(userId: number) {
    return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '2h' });
  }

  async signup(dto: any) {
    if (await this.repo.findByEmail(dto.email))
      throw createError(400, 'Email ya registrado');

    const hash = await bcrypt.hash(dto.password, 12);
    const user = await this.repo.create({
      email: dto.email,
      passwordHash: hash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      address: dto.address ?? '',
    });
    const token = this.signToken(user.id);
    return { token, usuario: user };
  }

  async signin(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw createError(401, 'Credenciales inválidas');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw createError(401, 'Credenciales inválidas');

    return { token: this.signToken(user.id), usuario: user };
  }

  async forgot(email: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) return; // evitar enumeración

    const token = uuid();
    const exp = new Date(Date.now() + 15 * 60 * 1000); // 15min
    await this.repo.setResetToken(user.id, token, exp);

    // Mailtrap demo transport
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      to: email,
      from: 'no-reply@tallerweb2.com',
      subject: 'Recuperar contraseña',
      html: `<p>Haz clic <a href="${CLIENT_URL}/reset?token=${token}">aquí</a> para restablecer tu contraseña.</p>`,
    });
  }

  async reset(token: string, newPass: string) {
    const user = await prisma.usuario.findFirst({
      where: { resetToken: token, resetTokenExp: { gt: new Date() } },
    });
    if (!user) throw createError(400, 'Token inválido o expirado');

    const hash = await bcrypt.hash(newPass, 12);
    await this.repo.resetPassword(user.id, hash);
  }
}

