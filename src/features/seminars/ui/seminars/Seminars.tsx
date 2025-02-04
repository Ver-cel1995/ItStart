import {useGetSeminarsQuery} from "../../api/seminarsApi";
import {Box, CircularProgress, Grid, List, Paper} from "@mui/material";
import {Modals} from "../modal/Modal";
import {UpdateModel} from "../../api/seminarsApi.types";

export const SeminarList = () => {
    const {data: seminars, isLoading} = useGetSeminarsQuery();

    // Страница загрузки
    if (isLoading) return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress size={150} thickness={3}/>
        </Box>
    )

    return (
        <div>
            <Grid container>
                {seminars?.map((seminar) => {
                    const modelSeminar: UpdateModel = {
                        id: seminar.id,
                        description: seminar.description,
                        title: seminar.title,
                        date: seminar.date,
                        time: seminar.time,
                        photo: seminar.photo
                    }
                    return (
                        <Grid sx={{mb: '40px', ml: '40px'}} >
                            <Paper elevation={3}>
                                <List>
                                    <h3>{seminar.title}</h3>
                                    <p style={{width: '480px'}}>{seminar.description}</p>
                                    <p>{seminar.date} {seminar.time}</p>
                                    <img src={seminar.photo} alt={seminar.title} width={200}/>
                                    <Modals model={modelSeminar}/>
                                </List>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
};