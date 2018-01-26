export default ({store, redirect}) => {
    if (store.state.ClientToken.length > 0 && store.state.ClientRole === store.state.ClientInfo.role && store.state.ClientRole === 'manager') ;
    else redirect('/tai-khoan/404')
}