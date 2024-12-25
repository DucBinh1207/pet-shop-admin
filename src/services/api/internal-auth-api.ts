import axios from "axios";

export async function saveAuthTokenForInternalServer(token: string) {
  await axios.post("/api/auth/token", { token });
}

export async function getAuthTokenFromInternalServer() {
  try {
    const token = await axios.get("/api/auth/token");
    return token.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAuthTokenFromInternalServer() {
  try {
    await axios.delete("/api/auth/token");
  } catch (error) {
    console.log(error);
  }
}

export async function saveUserRoleForInternalServer({
  role,
  time,
}: {
  role: number;
  time: number;
}) {
  await axios.post("/api/auth/role", { role, time });
}

export async function getUserRoleFromInternalServer() {
  try {
    const role = await axios.get("/api/auth/role");
    return role.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUserRoleFromInternalServer() {
  try {
    await axios.delete("/api/auth/role");
  } catch (error) {
    console.log(error);
  }
}
