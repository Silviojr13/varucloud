// This is a representation of the Prisma User model for consistency with Clean Architecture
export class User {
  constructor({ id, nome, email, senha, createdAt }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.createdAt = createdAt || new Date();
  }
}