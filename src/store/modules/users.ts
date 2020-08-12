import {
    getModule,
    Module,
    MutationAction,
    VuexModule,
    Action
} from 'vuex-module-decorators';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'users',
    store,
    dynamic: true,
})
class UsersModule extends VuexModule {
    @Action
    usersprom() {
        console.log(456)
    }
}

export default getModule(UsersModule);