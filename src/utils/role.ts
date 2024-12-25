export function setRole(role: 1 | 2 | 3) {
  localStorage.setItem("userRole", role.toString());
}

export function getRole() {
  const role = localStorage.getItem("userRole");
  return role ? (parseInt(role, 10) as 1 | 2 | 3) : null;
}
