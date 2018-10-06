import { ModelBase } from './models.base';
import { Inject, Injectable, FactoryProvider } from '@dilta/core';
import {
  Auth,
  EntityNames,
  Manager,
  Parent,
  Receipt,
  School,
  Student,
  User,
  Setting,
  Expense,
  Score
} from '@dilta/shared';
import { Embededb, electronDatabase } from '@dilta/emdb';

/** Token For RXDB leveldown instance */
export const EmbededDatabaseToken = 'RXDB_LOCAL';

// @Inject(EmbededDatabaseToken) public database:  Promise<Embededb>

/**
 * Service priovider for user Authentication storage and operations
 *
 * @export
 * @class AuthService
 * @extends {ModelBase<Auth>}
 */
@Injectable()
export class AuthService extends ModelBase<Auth> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Auth, database);
  }

  /** redacts to protect user fields */
  santizeAuth(authId: Auth) {
    if (!authId) {
      return authId;
    }
    const { hash, updatedAt, password, ...allowed } = authId;
    return allowed;
  }
}

/**
 * ManagerService for users offline storage
 *
 * @export
 * @class ManagerService
 * @extends {ModelBase<Manager>}
 */
@Injectable()
export class ManagerService extends ModelBase<Manager> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Manager, database);
  }
}

/**
 * Class responsble for parent offline storage operations
 *
 * @export
 * @class ParentService
 * @extends {ModelBase<Parent>}
 */
@Injectable()
export class ParentService extends ModelBase<Parent> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Parent, database);
  }
}

/**
 * responsible for the database operations of receipts
 *
 * @export
 * @class ReceiptService
 * @extends {ModelBase<Receipt>}
 */
@Injectable()
export class ReceiptService extends ModelBase<Receipt> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Receipt, database);
  }
}

/**
 * responsible for school database operations
 *
 * @export
 * @class SchoolService
 * @extends {ModelBase<School>}
 */
@Injectable()
export class SchoolService extends ModelBase<School> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.School, database);
  }
}

/**
 * responsible for student score database operations
 *
 * @export
 * @class ScoreService
 * @extends {ModelBase<Score>}
 */
@Injectable()
export class ScoreService extends ModelBase<Score> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Score, database);
  }
}

/**
 * responsible for student biodata crud operations
 *
 * @export
 * @class StudentService
 * @extends {ModelBase<Student>}
 */
@Injectable()
export class StudentService extends ModelBase<Student> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Student, database);
  }
}

/**
 * responsible for the users [ teachers ] database operations
 *
 * @export
 * @class UserService
 * @extends {ModelBase<User>}
 */
@Injectable()
export class UserService extends ModelBase<User> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.User, database);
  }
}

/**
 * responsible for users and school settings database operations
 *
 * @export
 * @class SettingService
 * @extends {ModelBase<Settings>}
 */
@Injectable()
export class SettingService extends ModelBase<Setting> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Setting, database);
  }
}

/**
 * responsible for expenses database operations
 *
 * @export
 * @class ExpenseService
 * @extends {ModelBase<Expense>}
 */
@Injectable()
export class ExpenseService extends ModelBase<Expense> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Expense, database);
  }
}

/** Provider Token Mapping  */
const embededDBProvider: FactoryProvider = {
  provide: EmbededDatabaseToken,
  useFactory: electronDatabase
};

export const databaseServices = [
  embededDBProvider,
  AuthService,
  ManagerService,
  ParentService,
  ReceiptService,
  SchoolService,
  ScoreService,
  StudentService,
  UserService,
  SettingService,
  ExpenseService
];
