import { router } from '@src/router/index';
import { isNavigationFailure } from 'vue-router';

router.beforeEach(to => {
    if (to.path === '/homeAgain') {
        return { path: '/' };
    }
});
router.afterEach((to, from, failure) => {
    if (isNavigationFailure(failure)) {
        console.error('路由错误啦', failure);
    }
});
