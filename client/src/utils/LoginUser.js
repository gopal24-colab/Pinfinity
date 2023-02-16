import jwt_decode from "jwt-decode";

export const createOrGetUser = async (response)={
    const :decoded = jwt_decode(response.access_token)
    ,console,log(decoded)
}