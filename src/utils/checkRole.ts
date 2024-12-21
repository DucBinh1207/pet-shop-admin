export default function CheckRole(role: number) {
  if (role === 2) return true;
  else return false;
}

export function RoleRender(role: number) {
  if (CheckRole(role)) {
    return "Quản lý";
  } else return "Nhân viên";
}
