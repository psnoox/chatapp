import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
export default function NotFound(){
    return (
        <>
            <Container align='center'>
                <Typography sx={{fontSize: 200}}>404</Typography>
                <Typography sx={{fontSize: 20}}>Page Not Found</Typography>
            </Container>
        </>
    )
}