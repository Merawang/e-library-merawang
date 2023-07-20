import { useEffect } from "react";
import axios from "axios";

const useFetch = ({ url, dispatch, type, setLoading, setMessage }) => {

    useEffect(() => {
        (
            async () => {
                setLoading(true);
                try {
                    const response = await axios.get(url);

                    // console.log(response);

                    dispatch({ type, payload: response.data.data });
                    setMessage({ error: false, severity: 'success', message: `Sukses melakukan fetch data` })

                }
                catch (error) {
                    alert(error.message);
                    setMessage({ error: true, severity: 'error', message: error.message || `Terjadi kesalahan pada server` });
                }
                finally {
                    setLoading(false);
                }
            }
        )();
    }, [dispatch])

}

export default useFetch;