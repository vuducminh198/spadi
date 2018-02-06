import Cookies from 'js-cookie'
import Cookie from 'cookie'

export default ({ redirect, store, isServer,route}) => {
    if (store.state.ClientRole !== 'manager' && store.state.ClientRole !== 'user' || store.state.ClientToken.length <= 10)
        redirect(`/tai-khoan/dang-nhap?redirect=${route.path}`)
}