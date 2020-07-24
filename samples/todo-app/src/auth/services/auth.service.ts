import { BehaviorSubject } from 'rxjs';
import { injectable } from 'inversify';

import { GetUser, GetUserDocument, GetUserVariables } from '../api/GetUser.generated';
import { GraphQLClient } from '../../common/services/graphQLClient';
import { GraphQLService } from '../../common/services/graphQL.service';
import { scopes } from '../../scopes';
import { ScopeService } from '../../common/services/scope.service';
import { StorageService } from '../../common/services/storage.service';
import { UserFields } from '../api/userFields.generated';

const SESSION_KEY = 'session';

@injectable()
export class AuthService extends GraphQLService {
  private readonly activeUser = new BehaviorSubject<UserFields | null>(null);

  private getUser = this.createQuery<GetUser, GetUserVariables>({
    document: GetUserDocument,
  });

  constructor(
    client: GraphQLClient,
    private readonly scopeService: ScopeService,
    private readonly storageService: StorageService,
  ) {
    super(client);
  }

  $activeUser = this.activeUser.asObservable();

  get loggedInUser() {
    return this.activeUser.value;
  }

  async signIn(userId: string): Promise<boolean> {
    const result = await this.getUser.fetch({
      id: userId,
    });

    const user = result?.data?.user;
    if (user) {
      this.saveSession(userId);
      this.activeUser.next(user);
      this.scopeService.attach(scopes.LOGGED_IN);
      return true;
    }

    return false;
  }

  signOut() {
    this.removeSession();
    this.scopeService.detach(scopes.LOGGED_IN);
  }

  async tryRestoreSession(): Promise<boolean> {
    const userId = this.storageService.getItem<string>(SESSION_KEY);
    if (userId) {
      return this.signIn(userId);
    }

    return false;
  }

  private saveSession(userId: string) {
    this.storageService.setItem(SESSION_KEY, userId);
  }

  private removeSession() {
    this.storageService.removeItem(SESSION_KEY);
  }
}
