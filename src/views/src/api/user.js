import http from '@/lib/request'

export function login (params) {
    return http.request({
        url: '/User/Login',
        method: 'post'
    }, params)
}

export function logout (params) {
    return http.request({
        url: '/User/Logout',
        method: 'post'
    }, params)
}
