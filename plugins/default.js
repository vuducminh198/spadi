export default ({app, store}) => {
    app.cf = () => {
        return {
            headers:{ Authorization: `Bearer ${store.state.token}`}
        }
    }
}