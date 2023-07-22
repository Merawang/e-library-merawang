import { useEffect } from "react";
import axios from "axios";

const useISBN = ({ url, isbn, setData, setLoading, setMessage }) => {

    (
        async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${url}/search?q=${isbn}`);

                setData(response.data.data);
                setMessage({ error: false, severity: 'success', message: `Sukses melakukan fetch data` })

            }
            catch (error) {
                const errorMessage = error?.response?.data?.error || error.message || 'Terjadi kesalahan pada server'
                setMessage({ error: true, severity: 'error', message: errorMessage });

                alert(errorMessage);
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        }
    )();

}

export default useISBN;