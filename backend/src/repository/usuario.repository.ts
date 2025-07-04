import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class UsuarioRepository {
  create(data: Prisma.UsuarioCreateInput) {
    return prisma.usuario.create({ data });
  }

  findByEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email } });
  }

  setResetToken(id: number, token: string, exp: Date) {
    return prisma.usuario.update({
      where: { id },
      data: { resetToken: token, resetTokenExp: exp },
    });
  }

  resetPassword(id: number, hash: string) {
    return prisma.usuario.update({
      where: { id },
      data: { passwordHash: hash, resetToken: null, resetTokenExp: null },
    });
  }
}
