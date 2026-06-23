function Dice(props){
    let classes = props.selected ? "die selected" : "die";

    return(
        <div className={classes} onClick={() => props.handleClick(props.id, props.number)}>
            {props.number}
        </div>
    )
}

export {Dice}