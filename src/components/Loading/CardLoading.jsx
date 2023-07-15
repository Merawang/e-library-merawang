import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

const CardLoading = () => {
    return (<>
        <Card sx={{ maxWidth: 345, height: 350 }}>
            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
            <CardHeader
                title={
                    <Skeleton
                        animation="wave"
                        height={20}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                }
                subheader={
                    <Skeleton animation="wave" height={10} width="40%" />
                }
            />
            <CardContent>
                <>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10}  />
                </>
            </CardContent>
        </Card>
    </>);
}

export default CardLoading;