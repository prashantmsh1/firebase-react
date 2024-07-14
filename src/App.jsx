import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase-config.js";
import { getDocs, updateDoc, addDoc, doc, deleteDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
function App() {
    const [movieList, setMovieList] = useState([]);

    const [newMovie, setNewMovie] = useState("");
    const [newReleaseDate, setNewReleaseDate] = useState("");
    const [newOscar, setNewOscar] = useState(false);

    const [newMovieTitle, setNewMovieTitle] = useState("");

    const [file, setFile] = useState(null);

    const uploadFile = async () => {
        if (file) {
            const fileFolderRef = ref(storage, "projectfile/" + file.name);
            try {
                await uploadBytes(fileFolderRef, file);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("No file selected");
        }
    };
    const getMovieList = async () => {
        try {
            const data = await getDocs(collection(db, "movies"));
            const filteredData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            console.log(filteredData);
            setMovieList(filteredData);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getMovieList();
    }, []);

    const onSubmitMovie = async () => {
        try {
            const docRef = await addDoc(collection(db, "movies"), {
                title: newMovie,
                releaseDate: newReleaseDate,
                receivedOscar: newOscar,
                userId: auth?.currentUser?.uid,
            });
            console.log("Document written with ID: ", docRef.id);
            getMovieList();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    const deleteMovie = async (id) => {
        try {
            await deleteDoc(doc(db, "movies", id));
            getMovieList();
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };
    const updateMovie = async (id) => {
        try {
            await updateDoc(doc(db, "movies", id), { title: newMovieTitle });
            getMovieList();
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };
    return (
        <div>
            <Auth />
            <div className="flex flex-col items-center justify-center w-3/5 m-12 mx-auto ">
                <input
                    onChange={(e) => setNewMovie(e.target.value)}
                    type="text"
                    placeholder="movie title"
                />
                <input
                    onChange={(e) => setNewReleaseDate(e.target.value)}
                    type="text"
                    placeholder="release date"
                />
                <div>
                    <label htmlFor="">Received an Oscar</label>
                    <input
                        checked={newOscar}
                        onChange={(e) => setNewOscar(e.target.checked)}
                        type="checkbox"
                    />
                </div>
                <div>
                    <input
                        type="file"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                    />
                    <button onClick={uploadFile} className="p-2 rounded-md shadow-md ">
                        Upload File
                    </button>
                </div>

                <button onClick={onSubmitMovie} className=" w-fit">
                    Add Movie
                </button>
            </div>
            <div className="flex flex-col items-center justify-center w-1/3 mx-auto text-black ">
                {movieList.map((movie) => (
                    <div key={movie.id}>
                        <h1>{movie.title}</h1>
                        <p>{movie.receivedOscar ? "Oscar Winner" : "Not an Oscar Winner"}</p>
                        <p>{movie.releaseDate}</p>
                        <button
                            className="p-2 bg-blue-500 rounded "
                            onClick={() => deleteMovie(movie.id)}>
                            Delete
                        </button>
                        <input
                            onChange={(e) => setNewMovieTitle(e.target.value)}
                            type="text"
                            className="p-2 border-2 border-gray-500 rounded"
                            placeholder="new movie title"
                        />
                        <button onClick={() => updateMovie(movie.id)} className="p-2 bg-green-500 ">
                            Update movie title
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
