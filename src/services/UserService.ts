import { Repository } from 'typeorm';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from "../repositories/UsersRepository"

class UsersService {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string) {
        // Verificar se o usuário existe
        const userExistis = await this.usersRepository.findOne({
            email,
        });

        // Se existir, retornar user
        if (userExistis) {
            return userExistis;
        }

        const user = this.usersRepository.create({
            email,
        });

        await this.usersRepository.save(user);

        // Se não existir, salvar no DB
        return user;

    }
}

export { UsersService }