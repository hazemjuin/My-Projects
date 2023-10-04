import React from "react";
import { Rating, Typography } from "@material-tailwind/react";

export function NoteStars() {
    const [rated, setRated] = React.useState(4);

    return (
        <div className="flex items-center gap-2 "
        style={{marginLeft:'9rem'}}>
            <Rating value={4} onChange={(value) => setRated(value)} />
            <Typography color="blue-gray" className="font-medium">
                {rated}.0 Rated
            </Typography>
        </div>
    );
}export default NoteStars;