// nuxt middleware
export default ({ app, store , $axios }) => {
    let cookie = app.$cookies.get('user');
    
    if(cookie) store.commit("EditUser", cookie)
}