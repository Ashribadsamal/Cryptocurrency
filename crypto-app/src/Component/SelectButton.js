import { makeStyles, Select } from '@material-ui/core'
import React from 'react'
//import { Classnames } from 'react-alice-carousel'

function SelectButton({children,onClick,selected}) {
    const useStyles = makeStyles({
        selectbutton:{
            border: "1px solid gold",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Monserrat",
            cursor: "pointer",
            backgroundColor: selected ? "gold": "",
            color: selected? 700 : 500,
            "&:hover":{
                backgroundColor: "gold",
                color: "black"
            },
            width: "22%"
        }
    })

    const classes = useStyles()
    return (
        <span
        className={classes.selectbutton}
        onClick={onClick}
        selected={selected}
        >
            {children}
        </span>
    )
}

export default SelectButton
