import axios from "axios";
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    getDoc,
    query,
    where,
    orderBy,
    OrderByDirection
} from 'firebase/firestore';
import { DataProvider, 
    GetListParams, 
    GetOneParams, 
    UpdateParams,
    DeleteParams,
    CreateParams
 } from "react-admin";
import { db } from "./FIREBASE_CONFIG";

export const dataProvider = {
    getList: async (resource: string, params: GetListParams) => {
        if (resource === "movies") {
            console.log('rrreeeee', resource);
            console.log('parramss', params);
            const page = params.pagination.page;
            const field = params.sort.field;
            const order = params.sort.order.toLowerCase();

            const apiKey = "d6dcac28399977979bc20e088412bc15";
            // const apiURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
            // console.log(apiURL);
            try {
                if (Object.keys(params.filter).length === 0) {
                    console.log('truuu');
                    console.log(' FIELD ORDER', params.sort.field)
                    console.log(' SORT ORDER', params.sort.order.toLowerCase())
                    const apiURL = `https://api.themoviedb.org/3/discover/movie?sort_by=${field}.${order}&api_key=${apiKey}&page=${page}`;
                    const { data } = await axios.get(apiURL, {
                        params: {
                            api_key: apiKey,
                            language: "en_US",
                        },
                    });

                    console.log('ssssssssssssssssssssssss', data.results);
                    const posterUrl = "https://image.tmdb.org/t/p/w154/";
                    const modifiedData = data.results.map((m: any) => ({
                        id: m.id,
                        backPoster: posterUrl + m.backdrop_path,
                        popularity: m.popularity,
                        title: m.title,
                        poster: posterUrl + m.poster_path,
                        overview: m.overview,
                        rating: m.vote_average,
                        release_date: m.release_date,
                    }));

                    console.log(modifiedData);
                    console.log(data.total_pages);
                    return { data: modifiedData, total: 10000 };
                } else {
                    console.log('isi');
                    const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&sort_by=${params.sort.field}.${params.sort.order.toLowerCase()}&page=${page}&query=${params.filter.title}`;
                    const { data } = await axios.get(apiURL, {
                        params: {
                            api_key: apiKey,
                            language: "en_US",
                            // page: 1,
                            // pagination: { page: 1, perPage: 20 },
                            // sort: { field: 'popularity', order: 'desc' },
                            // filter: { author_id: 12 },
                        },
                    });

                    console.log('ssssssssssssssssssssssss', data.results);
                    const posterUrl = "https://image.tmdb.org/t/p/w154/";
                    const modifiedData = data.results.map((m: any) => ({
                        id: m.id,
                        backPoster: posterUrl + m.backdrop_path,
                        popularity: m.popularity,
                        title: m.title,
                        poster: posterUrl + m.poster_path,
                        overview: m.overview,
                        rating: m.vote_average,
                        release_date: m.release_date,
                    }));

                    console.log(modifiedData);
                    console.log(data.total_results);
                    return { data: modifiedData, total: data.total_pages };
                }

            } catch (error) {
                console.log(error);
            }
        } else if (resource === "users") {
            console.log('rrreeeee', resource);
            console.log('parramss', params);
            const field = params.sort.field;
            const order = params.sort.order.toLowerCase();
            // const { page, perPage } = params.pagination;
            // const { q } = params.filter;
            console.log(field, order)
            try {
                if (Object.keys(params.filter).length === 0) {
                    console.log('trruuuu');

                    const userCollRef = collection(db, 'users');
                    const queryUser = query(userCollRef, orderBy(field, order as OrderByDirection));
                    const getUsers = await getDocs(queryUser);
                    console.log(getUsers);

                    const users = getUsers.docs.map(doc => ({
                        data: doc.data(),
                        id: doc.id,
                    }));
                    console.log('users search', users);

                    const modifiedData = users.map((m) => ({
                        email: m.data.email,
                        role: m.data.role,
                        uid: m.data.uid,
                        id: m.id,
                    }));
                    console.log('email search', modifiedData);
                    return { data: modifiedData, total: modifiedData.length };
                } else {
                    console.log('faaalllse');

                    const userCollRef = collection(db, 'users');
                    const getUsers = query(userCollRef, where("email", ">=", params.filter.email), where("email", "<=", params.filter.email + '\uf8ff'));

                    const querySnapshot = await getDocs(getUsers);
                    console.log(querySnapshot);
                    const users = querySnapshot.docs.map(doc => ({
                        data: doc.data(),
                        id: doc.id,
                    }));
                    console.log('users search', users);

                    const modifiedData = users.map((m) => ({
                        email: m.data.email,
                        role: m.data.role,
                        uid: m.data.uid,
                        id: m.id,
                    }));
                    console.log('email search', modifiedData);
                    return { data: modifiedData, total: modifiedData.length };
                }
            } catch (error) {
                console.log(error);
            }

        } else if (resource === "favorites") {
            const order = params.sort.order.toLowerCase();
            console.log('favorite order', order);
            try {
                if (Object.keys(params.filter).length === 0) {
                    const favoriteCollRef = collection(db, 'favorites');
                    const queryFavorite = query(favoriteCollRef, orderBy('email', order as OrderByDirection));
                    const getFavorites = await getDocs(queryFavorite);

                    const favorites = getFavorites.docs.map(doc => ({
                        data: doc.data(),
                        id: doc.id,
                    }))
                    console.log('favorites search', favorites);

                    const posterUrl = "https://image.tmdb.org/t/p/w154/";
                    const modifiedData = favorites.map((m) => ({
                        id: m.id,
                        id_movie: m.data.movie.id,
                        title: m.data.movie.title,
                        poster: posterUrl + m.data.movie.poster_path,
                        overview: m.data.movie.overview,
                        popularity: m.data.movie.popularity,
                        rating: m.data.movie.vote_average,
                        release_date: m.data.movie.release_date,
                        email: m.data.email,
                    }))
                    return { data: modifiedData, total: modifiedData.length };
                } else {
                    console.log(params.filter.email);
                    const favoriteCollRef = collection(db, 'favorites');
                    const getFavorites = query(favoriteCollRef, where("email", ">=", params.filter.email), where("email", "<=", params.filter.email + '\uf8ff'));

                    const querySnapshot = await getDocs(getFavorites);
                    console.log(querySnapshot);
                    const favorites = querySnapshot.docs.map(doc => ({
                        data: doc.data(),
                        id: doc.id,
                    }));
                    console.log('favorites search', favorites);

                    const posterUrl = "https://image.tmdb.org/t/p/w154/";
                    const modifiedData = favorites.map((m) => ({
                        id: m.id,
                        id_movie: m.data.movie.id,
                        title: m.data.movie.title,
                        poster: posterUrl + m.data.movie.poster_path,
                        overview: m.data.movie.overview,
                        popularity: m.data.movie.popularity,
                        rating: m.data.movie.vote_average,
                        release_date: m.data.movie.release_date,
                        email: m.data.email,
                    }));
                    console.log('email search', modifiedData);
                    return { data: modifiedData, total: modifiedData.length };
                }

                // const movieCollectionRef = collection(db, 'favorites');

                // const getFavMovies = await getDocs(movieCollectionRef).then(response => {
                //     console.log(response.docs);
                //     const favMovies = response.docs.map(doc => ({
                //         data: doc.data(),
                //         id: doc.id,
                //     }));
                //     console.log('faaaaaaaaavvvvvvvv', favMovies);

                //     const posterUrl = "https://image.tmdb.org/t/p/w154/";
                //     const modifiedData = favMovies.map((m) => ({
                //         id: m.id,
                //         id_movie: m.data.movie.id,
                //         title: m.data.movie.title,
                //         poster: posterUrl + m.data.movie.poster_path,
                //         overview: m.data.movie.overview,
                //         popularity: m.data.movie.popularity,
                //         rating: m.data.movie.vote_average,
                //         release_date: m.data.movie.release_date,
                //         email: m.data.email,
                //     }));
                //     console.log('favvvooiiii', modifiedData);
                //     return { data: modifiedData, total: modifiedData.length };
                // }).catch(error => console.log('wwwwwwww', error.message));
                // console.log('gettttttttttttt', getFavMovies);
                // return getFavMovies;

            } catch (error) {
                console.log(error);
            }
        }
    },
    getOne: async (resource: string, params: GetOneParams) => {
        if (resource === "users") {
            try {
                console.log('resource', resource);
                console.log('paraaammss', params);

                const userCollRef = doc(db, 'users', params.id);
                const getUser = await getDoc(userCollRef).then(response => {
                    console.log(response.data()?.email);

                    const modifiedData = {
                        email: response.data()?.email,
                        role: response.data()?.role,
                        uid: response.data()?.uid,
                        id: response.id,
                    };
                    console.log('users modified data', modifiedData);
                    return { data: modifiedData }
                }).catch(error => console.log('wwwwwwww', error.message));

                return getUser;
            } catch (error) {
                console.log(error);
            }
        } else if (resource === "favorites") {
            try {
                console.log('FAV PARAAMMSSS', params);

                const favoriteCollectionRef = doc(db, 'favorites', params.id);
                const getFavorite = await getDoc(favoriteCollectionRef)
                    .then(response => {
                        console.log(response.data());

                        const posterUrl = "https://image.tmdb.org/t/p/w154/";
                        const modifiedData = {
                            id: response.id,
                            id_movie: response.data()?.movie.id,
                            title: response.data()?.movie.title,
                            poster: posterUrl + response.data()?.movie.poster_path,
                            overview: response.data()?.movie.overview,
                            popularity: response.data()?.movie.popularity,
                            rating: response.data()?.movie.vote_average,
                            release_date: response.data()?.movie.release_date,
                            email: response.data()?.email,
                        }
                        console.log('fav modified data', modifiedData)
                        return { data: modifiedData }
                    }).catch((error) => console.log(error.message));

                return getFavorite;
                // const movieCollectionRef = collection(db, 'favorites');

                // const getFavMovies = await getDocs(movieCollectionRef).then(response => {
                //     console.log(response.docs);
                //     const favMovies = response.docs.map(doc => ({
                //         data: doc.data(),
                //         id: doc.id,
                //     }));
                //     const posterUrl = "https://image.tmdb.org/t/p/w154/";
                //     const modifiedData = favMovies.map((m) => ({
                //         id: m.id,
                //         id_movie: m.data.movie.id,
                //         title: m.data.movie.title,
                //         poster: posterUrl + m.data.movie.poster_path,
                //         overview: m.data.movie.overview,
                //         popularity: m.data.movie.popularity,
                //         rating: m.data.movie.vote_average,
                //         release_date: m.data.movie.release_date,
                //         email: m.data.email,
                //     }));

                //     console.log('favvvooiiii', modifiedData);
                //     for (let i = 0; i < modifiedData.length; i++) {
                //         console.log(modifiedData[i]);
                //         if (modifiedData[i].id === params.id) {
                //             return { data: modifiedData[i], total: modifiedData.length };
                //         } else {
                //             console.log('salahhh');
                //         }
                //     }
                // }).catch(error => console.log('wwwwwwww', error.message));
                // console.log('gettttttttttttt', getFavMovies);
                // return getFavMovies;
            } catch (error) {
                console.log(error);
            }
        } else if (resource === "movies") {
            console.log('params showww moviee', params);
            const apiKey = "d6dcac28399977979bc20e088412bc15";
            const apiURL = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`;
            try {
                console.log('parrrr', typeof params.id);
                const { data } = await axios.get(apiURL, {
                    params: {
                        api_key: apiKey,
                        language: "en_US",
                        page: 1,
                    },
                });

                console.log('HAY', data);
                const posterUrl = "https://image.tmdb.org/t/p/w154/";
                const modifiedData = {
                    id: data.id,
                    backPoster: posterUrl + data.backdrop_path,
                    popularity: data.popularity,
                    title: data.title,
                    poster: posterUrl + data.poster_path,
                    overview: data.overview,
                    rating: data.vote_average,
                    release_date: data.release_date,
                };
                console.log('SHOW YA SS', data);
                // for (let i = 0; i < modifiedData.length; i++) {
                //     console.log(typeof modifiedData[i].id);
                //     if (modifiedData[i].id === parseInt(params.id)) {
                //         console.log('moooooooooovvvvvvvvvvvss', modifiedData[i])
                //     } else {
                //         console.log('salahhh')
                //     }
                // }
                return { data: modifiedData };

            } catch (error) {
                console.log(error);
            }
        }
    },
    update: async (resource: string, params: UpdateParams) => {
        if (resource === "users") {
            try {
                console.log('edddiiiiiiiiitttt', params.id);
                console.log('edddiiiiiiiii', params.data.role);
                console.log('edddiiiiiiiii', params.previousData.role);

                // const userCollRef = collection(db, 'users');
                const userDocRef = doc(db, "users", params.id as string);
                updateDoc(userDocRef, {
                    role: params.data.role,
                }).catch(error => {
                    console.log(error.message);
                });
                return { data: { ...params.data, id: params.id } };
            } catch (error) {
                console.log(error);
                return;
            }
        }
        else if (resource === "favorites") {
            try {
                console.log('edddiiiiiiiiitttt', params.id);
                console.log('edddiiiiiiiii', params.data);
                console.log('edddiiiiiiiii', params.previousData);

                const dataMovie = {
                    id: params.data.id_movie,
                    title: params.data.title,
                    poster_path: params.data.poster,
                    overview: params.data.overview,
                    popularity: params.data.popularity,
                    vote_average: params.data.rating,
                    release_date: params.data.release_date
                }

                const favoriteDocRef = doc(db, 'favorites', params.id as string);
                updateDoc(favoriteDocRef, {
                    email: params.data.email,
                    movie: dataMovie,
                    uid: ''
                }).catch(error => {
                    console.log(error.message);
                });
                return { data: { ...params.data, id: params.id } };

            } catch (error) {
                console.log(error);
            }
        }

    },
    delete: async (resource: string, params: DeleteParams) => {
        if (resource === "users") {
            try {
                const userDocRef = doc(db, 'users', params.id as string);
                deleteDoc(userDocRef)
                    .then(() => console.log('Document deleted'))
                    .catch(error => console.log(error.message));
                return { data: { ...params.previousData, id: params.id } };
            } catch (error) {
                console.log(error);
            }
        }
        else if (resource === "favorites") {
            try {
                const favoriteDocRef = doc(db, 'favorites', params.id  as string);
                deleteDoc(favoriteDocRef)
                    .then(() => console.log('Favorite deleted'))
                    .catch((error) => console.log(error.message));
                
                return { data: { ...params.previousData, id: params.id }};
                
            } catch (error) {

            }
        }
    },
    create: async (resource: string, params: CreateParams) => {
        if (resource === "users") {
            try {
                console.log('creaatteeeeee', params);
                const userCollRef = collection(db, 'users');
                const addFavorite = addDoc(userCollRef, {
                    email: params.data.email,
                    role: params.data.role,
                    uid: '',
                }).then(response => {
                    console.log(response);
                    return { data: { ...params.data, id: response.id } };
                }).catch(error => {
                    console.log(error.message);
                });
                return addFavorite;
            } catch (error) {
                console.log(error);
            }
        }
        else if (resource === "favorites") {
            try {
                console.log('creaatteeeeee faavv', params);
                const dataMovie = {
                    id: params.data.id_movie,
                    title: params.data.title,
                    poster_path: params.data.poster,
                    overview: params.data.overview,
                    popularity: params.data.popularity,
                    vote_average: params.data.rating,
                    release_date: params.data.release_date
                }

                const userCollRef = collection(db, 'favorites');
                const addUser = addDoc(userCollRef, {
                    email: params.data.email,
                    movie: dataMovie,
                    uid: '',
                }).then(response => {
                    console.log(response);
                    return { data: { ...params.data, id: response.id } };
                }).catch(error => {
                    console.log(error.message);
                });
                return addUser;
            } catch (error) {
                console.log(error)
            }
        }
    }
} as DataProvider;