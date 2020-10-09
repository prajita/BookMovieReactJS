//import movieList from '../moviesList';

export const fetchPositionApi = (lat, long, callback) => {
    fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + lat + "&longitude=" + long + "&localityLanguage=en",
        {
            method: "GET",
            cache: "no-cache",
            headers: {
                'name': "Content-Type",
                'value': "application/json"
            }
        }
    )
        .then(
            res => res.json())
        .then(
            data => {
                console.log(data)
                callback(data);
            }
        ).catch(e => console.log('request failed::' + e));
}

export const fetchMoviesApi = (callback) => {
    fetch("http://localhost:3000/api/movies",
        {
            method: "GET",
            cache: "no-cache",
            headers: {
                'name': "Content-Type",
                'value': "application/json"
            }
        }
    )
        .then(
            res => res.json())
        .then(
            data => {
                console.log(data)
                callback(data);
            }
        ).catch(e => console.log('request failed::' + e));
}