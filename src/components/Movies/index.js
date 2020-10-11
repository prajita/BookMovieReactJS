import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

function Movies({ movies, selectMovie }) {

    function RowComponent({ row, index }) {
        return (
            <React.Fragment>
                <div className="card card-style">
                    <div className="card-body">
                        <p className="card-title" onClick={() => selectMovie(row)}>{row.Title + "(" + row.Language + ")"}</p>
                        <StarRatingComponent
                            name="rating"
                            starCount={10}
                            editing={false}
                            value={parseInt(row.imdbRating)}
                        />
                        <p className="card-text overflow-ellipsis">{row.Plot}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <div >
            {movies ? movies.map((e, index) => (<RowComponent row={e} key={index} index={index}></RowComponent>)):null}
        </div>
    );

}

export default Movies;
