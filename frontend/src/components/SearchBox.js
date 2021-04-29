import React from 'react';

const SearchBox = (props) =>{

    return (
        <>
            <div className="SearchBar">
                <input
                    placeholder="Dogs,Cats,Trees...."
                    value={props.searchValue.value}
                    onChange={(event)=>props.setSearchValue(event.target.value)}
                >
                </input>
                <p>Search pictures by #Tag name</p>
            </div>
        </>
    )
}

export default SearchBox;