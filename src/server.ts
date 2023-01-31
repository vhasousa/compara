import { app } from "app";

app.listen(process.env.PORT, () => console.log(`Server is running on http://${process.env.APP_HOST}:${process.env.PORT}`));
