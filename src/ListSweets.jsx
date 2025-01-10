import React from "react";

function ListSweets({ sweets }) {
    
    return (
        <>
            <h1>List of sweets.</h1>
            <div>
                {sweets.map((sweet) => {
                    return (
                        <>
                            <h4>{sweet.name}</h4>
                        </>
                )
            })}
            </div>
            
        </>
    )
}
export default ListSweets;