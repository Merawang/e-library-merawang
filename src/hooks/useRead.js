import { useEffect } from "react";
import axios from "axios";

const useRead = ({ url, setLoading, setMessage }) => {

    (
        async () => {
            setLoading(true);
            try {
                const response = await axios.get(url);

                window.open(response?.data?.data?.items[0]?.volumeInfo?.previewLink, '_blank');
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

}

export default useRead;