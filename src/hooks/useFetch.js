import { useEffect } from "react";
import axios from "axios";

const useFetch = ({ url, dispatch, type, setLoading, setMessage }) => {

    useEffect(() => {
        (
            async () => {
                setLoading(true);
                try {
                    const response = await axios.get(url);

                    dispatch({ type, payload: response.data.data });
                    setMessage({ error: false, severity: 'success', message: `Sukses melakukan fetch data` })

                }
                catch (error) {
                    const errorMessage = error?.response?.data?.error || error?.message || 'Terjadi kesalahan pada server'
                    setMessage({ error: true, severity: 'error', message: errorMessage });

                    alert(errorMessage);
                    console.error(error);
        
                }
                finally {
                    setLoading(false);
                }
            }
        )();
    }, [dispatch])

}

export default useFetch;