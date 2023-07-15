import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const NoBook = () => {
    return (<>
        <Card color="info" >
            <CardContent>
                <h4 className="inline" >
                    Tidak ada buku yang terdaftar, <span className="underline inline text-blue-500 font-semibold" >tambah buku?</span>
                </h4>
            </CardContent>
        </Card>
    </>);
}

export default NoBook;