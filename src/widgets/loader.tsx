import loader from "../assets/images/loader.gif";

const CustomLoader = (props:any) => {
    const width = props.width || "25px";
    return (
        <div id="main-loader">
        <img alt="loading..." width={width} src={loader} />
        </div>
    );
}

export default CustomLoader;