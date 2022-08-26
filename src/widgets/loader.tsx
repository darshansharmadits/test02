import loader from "../assets/images/loader.gif";

const CustomLoader = (props:any) => {
    return (
        <img alt="loading..." width="25px" src={loader} />
    );
}

export default CustomLoader;