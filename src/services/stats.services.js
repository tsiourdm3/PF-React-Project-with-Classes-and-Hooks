import http from "../http-common";


    function getAll() {
        return http.get("/stats");
    }

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll};