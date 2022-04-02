import { request } from '@src/utils/request';

export const getUser = () =>
    request({
        url: '/admin/getmemberinfo',
        method: 'post',
        banRepeatCancel: false,
    });
