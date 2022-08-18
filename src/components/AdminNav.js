import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"; 

function AdminNavBar() {
  const navigate = useNavigate();
function SignOut(){
    localStorage.removeItem("user");
    navigate("/")
}
  return (
    <div class="container">
      <nav class=" navbar navbar-expand-lg navbar-light bg-light fixed-top justify-content-end">
        <a
          class="navbar-brand"
          onClick={() => {
            navigate("/admin");
          }}
        >
          Admin
        </a>
        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav ">
            <li class="nav-item active">
              <a
                class=" nav-link nav-item"
                onClick={() => {
                  navigate("/admin");
                }}
              >
                Create Event
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link nav-item"
                onClick={() => {
                  navigate("/admin/edit");
                }}
              >
                Edit Event
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link nav-item" onClick={()=>{SignOut()}}>
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default AdminNavBar;
