import { Repository } from 'typeorm';
import { ClientEntity } from '../entity/client.entity';

export type ClientRepository = Repository<ClientEntity>;
