import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../actions';


function MovieDetails({ ...props }) {
    const movie = props.moviesListGlobal.movies.filter(e => props.location.pathname.includes(e.imdbID))[0];
    const posters = movie.Stills;
    const [showSoundEffect, setSoundEffect] = useState(false);
    const dispatch = useDispatch();
    function gotoDashboard() {
        props.history.push('/movies');
    }
    function selectSoundEffect() {
        setSoundEffect(!showSoundEffect);
    }
    function bookNow(val) {
        let index = parseInt(val);
        console.log("Book movie with sound effect " + movie.SoundEffects[index]);
        setSoundEffect(!showSoundEffect);

    }
    function userLogout() {
        dispatch(logout());
        props.history.push('/logout');
    }

    const slide = <div id="carouselSlide " className="carousel slide carousel-fade" data-ride="carousel">
        <ol className="carousel-indicators">
            <li data-target="#carouselSlide" data-slide-to="0" className="active"></li>
            <li data-target="#carouselSlide" data-slide-to="1"></li>
            <li data-target="#carouselSlide" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img className="d-block w-100 slide-style" src={posters[0]} alt="slide" />
            </div>
            {posters.filter((e, i) => i !== 0).map((e, i) =>
                <div key={i} className="carousel-item">
                    <img className="d-block w-100 slide-style" src={e} alt="slide" />
                </div>
            )}
        </div>
        <a className="carousel-control-prev" href="#carouselSlide" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" ></span>
        </a>
        <a className="carousel-control-next" href="#carouselSlide" role="button" data-slide="next">
            <span className="carousel-control-next-icon" ></span>
        </a>
    </div>
    return (
        <React.Fragment>

            <div className="movie_details">
                <div className="movie_details_header">
                    <button className="btn1" onClick={() => gotoDashboard()} >Back to Dashboard</button>
                    <button className="btn2" onClick={() => userLogout()}>Logout</button>
                </div>
                <p className="movie-title">{movie.Title}{"(" + movie.Language.toLowerCase() + ")"}</p>
                <StarRatingComponent
                    name="rating"
                    starCount={10}
                    editing={false}
                    value={parseInt(movie.imdbRating)} />

                <div className="flex-container-row">
                    <p className="card-title">{"Movie Location :" + movie.Location}</p>
                    <p className="glow">{movie.listingType}</p>

                    <button onClick={(e) => selectSoundEffect(e)}>Book Now</button>
                    {showSoundEffect &&
                        <div id="myDropdown" className="dropdown-content-sound">
                            <p id="0" key="0" onClick={(e) => bookNow(e.target.id)}>{movie.SoundEffects[0]}</p>
                            <p id="1" key="1" onClick={(e) => bookNow(e.target.id)}>{movie.SoundEffects[1]}</p>
                        </div>

                    }
                </div>
            </div>

            <div className="card movieCard">
                <img className="card-img-top imageBorder" src={movie.Poster} alt="Card caption" />
                <p className="paragraph">{movie.Plot}</p>
                {slide}
            </div>

        </React.Fragment >
    )

}
const mapStateToProps = (state) => {
    return {
        moviesListGlobal: state.moviesListGlobal,
        loading: state.loading
    };
}
const mapDispatchToProps = (dispatch) => {
    return (
        bindActionCreators(
            {
            }, dispatch
        )
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);

