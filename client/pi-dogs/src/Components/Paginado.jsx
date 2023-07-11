import React from "react";


const Paginado = ({dogsPerPage, dogs, paginado}) => {
    const pageNumbers = []; 

    for (let i = 0; i <= Math.ceil(dogs/dogsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>

            <ul>
                {pageNumbers && pageNumbers.map(num => {(

                    <li key={num}>
                    <a onClick={()=>paginado(num)}>{num}</a>
                    </li>
                )})}

            </ul>


        </nav>
    )

}

export default Paginado; 