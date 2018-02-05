export default ({redirect,store}) =>{
        if (store.state.AdminToken.length<10 || store.state.AdminInfo.name.length <= 1)
            redirect('/quan-tri/dang-nhap');
}