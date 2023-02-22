const Button = ( {className , handleClick , additional , text} ) => {
    return (
        <button className={className} onClick={handleClick} >
            <span className={additional}></span>
            {text}
        </button>
    );
}
 
export default Button;