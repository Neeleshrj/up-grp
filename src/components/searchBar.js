import React,{useState,useEffect} from 'react';
import { TextField, Button, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

export default function SearchBar(props){
    const {rows,updateRows} = props
    const [search,updateSearch] = useState("")
    function filterRows(){
        if(search){
        const filteredData = rows.filter(x=>{
            let match = false
            var re = new RegExp(`^${search}.*`,"i");
            console.log(x)
            Object.keys(x).forEach(y=>{
                console.log(x[y])
                if((x[y]+"").match(re)) match = true
            })
            return match
        })
        return updateRows(filteredData)
      }
      else updateRows(rows)
    }
    return(
        <>
        <TextField
          id="standard-basic"
          style={{ width: "20%",marginBottom: "2%" }}
          variant="outlined"
          onChange={(e)=>updateSearch(e.target.value)}
        />
        <Button 
          onClick={()=>filterRows()} 
          size="small"
          variant="contained"
          style={{ marginTop: "1%",marginLeft: "2%"}}
          color="primary"
          
        >
            <SearchIcon />
            खोज करें
        </Button>
        </>
    );
} 