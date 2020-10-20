import React, { Component } from 'react';
import { fetchPositionApi } from '../utils/fetchDetails';
import PropTypes from 'prop-types';
import '../App.css';
import SpinnerComponent from '../components/SpinnerComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withAuth0 } from '@auth0/auth0-react';
import { logoutState } from '../actions';
import Movies from '../components/Movies';



class Dashboard extends Component {
    constructor(props) {
        super(props);
        let list = null;
        if (props && props.moviesListGlobal && props.moviesListGlobal.movies) {
            list = props.moviesListGlobal.movies;
        }
        this.state = {
            movies: list,
            filteredList: list
        }
        this.searchMovie = this.searchMovie.bind(this);
        this.sortByMovieName = this.sortByMovieName.bind(this);
        this.sortByReviews = this.sortByReviews.bind(this);
        this.selectMovie = this.selectMovie.bind(this);
        this.filterByLanguage = this.filterByLanguage.bind(this);

    }
    static getDerivedStateFromProps(props, state) {
        if (state.movies) {
            return {}
        }
        let list = null;
        if (props && props.moviesListGlobal && props.moviesListGlobal.movies) {
            list = props.moviesListGlobal.movies;
        }
        return {
            movies: list,
            filteredList: list
        }
    }
    searchMovie(name) {
        let movies = this.state.filteredList.filter(e => e.Title.toLowerCase().includes(name.toLowerCase()));
        this.setState({ movies })
    }
    sortByMovieName() {
        let movies = this.state.movies.sort((a, b) => a.Title > b.Title ? 1 : -1);
        this.setState({ movies })
    }
    sortByReviews() {
        let movies = this.state.movies.sort((a, b) => parseInt(a.imdbRating) <= parseInt(b.imdbRating) ? 1 : -1);
        this.setState({ movies })
    }

    selectMovie(row) {
        this.props.history.push('/movies/' + row.imdbID);
    }

    filterByLanguage(lang) {
        let movieList = this.props.moviesListGlobal;
        let movies = lang === 'None' ? movieList.movies : movieList.movies.filter(e => e.Language.toLowerCase() === lang.toLowerCase());
        this.setState({ movies, filteredList: movies })
    }
    userLogout() {
        this.props.logoutState();
        const { logout } = this.props.auth0;
        logout({ returnTo: window.location.origin+'/logout' });
       // logout({ returnTo: 'http://localhost:3001/logout' });

    }


    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            fetchPositionApi(position.coords.latitude, position.coords.longitude, (res) => { console.log("city or locality::" + res.locality) })
        }, failure => {
            if (failure.message.startsWith("Only secure origins are allowed")) {
                alert("Geolocation is not supported by this browser.");
                //set default as bangalore
            }
        });
    }

    render() {
        return (
            <div>
                {this.props.loading ?
                    <SpinnerComponent message="Loading collections..." /> :
                    <React.Fragment>
                        <div><span className="heading">Hello {this.props.username} !! watch your favorite movies !!</span>
                            <button onClick={() => this.userLogout()} className="Logout">Logout</button>
                        </div>
                        <div className="App flex-container">
                            <label className="">Sort By</label>
                            <button id="review" onClick={() => this.sortByReviews()} >Best Reviews</button>
                            <button id="recent" onClick={() => this.sortByMovieName()} >Movie Name</button>
                            <span>Search Movie Name: </span>
                            <input className="searchbox form-control" placeholder="search..."
                                type="text" onChange={(e) => this.searchMovie(e.target.value)}></input>

                            <div className="btn-group">
                                <button type="button" className="dropdown-toggle"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Filter
                            </button>
                                <div className="dropdown-menu">
                                    <p className="dropdown-item dropdown-item-each" id="Hindi" onClick={(e) => this.filterByLanguage(e.target.id)} >Hindi</p>
                                    <p className="dropdown-item dropdown-item-each" id="English" onClick={(e) => this.filterByLanguage(e.target.id)}>English</p>
                                    <p className="dropdown-item dropdown-item-each" id="None" onClick={(e) => this.filterByLanguage(e.target.id)}>None</p>

                                </div>
                            </div>
                        </div>
                        <Movies movies={this.state.movies} selectMovie={this.selectMovie} />
                    </React.Fragment>
                }
            </div>
        );
    }
}
Dashboard.propTypes = {
    movies: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        moviesListGlobal: state.moviesListGlobal,
        loading: state.loading,
        username: state.username

    };
}
const mapDispatchToProps = (dispatch) => {
    return (
        bindActionCreators(
            {
                logoutState
            }, dispatch
        )
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(withAuth0(Dashboard));

