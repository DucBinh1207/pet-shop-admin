import axios from "axios";

export async function saveAuthTokenForInternalServer(token: string) {
  await axios.post("/api/auth/token", { token });
}

export async function getAuthTokenFromInternalServer() {
  try {
    const token = await axios.get("/api/auth/token");
    return token.data;
  } catch (error) {}
}

export async function deleteAuthTokenFromInternalServer() {
  try {
    await axios.delete("/api/auth/token");
  } catch (error) {}
}
