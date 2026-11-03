import app from "./src/app.js";
import "dotenv/config";
import connToDB from "./src/db/dbConn.js";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    connToDB();
    console.log(`Server is running at http://localhost:${PORT}`);
});
