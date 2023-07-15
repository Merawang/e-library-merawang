import { createFetcher } from "@/utils/fetcher";
import { useEffect } from "react";

const useFetch = ({ url, dispatch, type, setLoading, setMessage }) => {

    useEffect(() => {
        (
            async () => {
                setLoading(true);
                try {
                    const fetcher = createFetcher();
                    const response = await fetcher.get(url);

                    // console.log(response);

                    dispatch({ type, payload: response.data });
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