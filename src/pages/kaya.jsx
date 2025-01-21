function Kaya() {

    const user = {
        name: "oslynx",
        imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
        imageSize: 90,

    }
    return (
        <>
            <h1>{user.name}</h1>
            <h2>salut ça va</h2>
            <img className={"avatar"} src={user.imageUrl} style={{
                width: user.imageSize,
                height: user.imageSize
            }}/>
    </>
    )
}

export default Kaya