import { getAuthUser } from "../../helper/Storage";

const Account=()=>{
    const type=["Reader","Admin"];
    return (
        <div style={{backgroundColor:"antiquewhite",width:"80%", marginLeft:"auto",marginRight:"auto",paddingLeft:"3%"} }>
            <h1>name: {getAuthUser().name}</h1>
            <br />
            <h1>email: {getAuthUser().email}</h1>
            <br />
            <h1>phone: +20{getAuthUser().phone}</h1>
            <br />
            <h1>role: {type[getAuthUser().role]}</h1>
        </div>
    )
}

export default Account;