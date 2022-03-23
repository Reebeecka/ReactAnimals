import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
    return(<>
    <header>
        <div className="logo-container"></div>
        <Link to="/">Startsida</Link>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </>);
}