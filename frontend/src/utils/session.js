export const getAccessToken = () => {
    const token = localStorage.getItem('token');
    return token || null
}
export const isAdminSession = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.isAdmin || false
}
