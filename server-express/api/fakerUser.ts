// ESM
import { faker } from '@faker-js/faker';

type User = {
    email:string, 
    password:string;
}

export function createRandomUser(): User {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 5,
});

