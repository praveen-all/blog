import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserModel from "./UserModel";
import { UserState } from "../context/UserContext";

function NavBar() {
  const location = useLocation();
  const { User, setSearch } = UserState();
  const [search, setsearch] = useState();
  const handlerSearch = (e) => {
    e.preventDefault();
    setSearch(search);
  };
  if (search === "") {
    setSearch(search);
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-info sticky"
      style={{ position: "sticky" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
         Blogs
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/create" ? "active" : ""
                }`}
                to="/create"
              >
                Create
              </Link>
            </li>
          </ul>
          {User ? (
            <>
              <form className="d-flex" onSubmit={handlerSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                  value={search}
                />
              </form>
              <UserModel>
                <button
                  className="btn bg-light my-1"
                  style={{
                    color: "#0bceff",
                    borderRadius: "100%",
                    boxShadow: "0px 0px 2px 2px white",
                  }}
                  type="button"
                >
                  <i class="fa-solid fa-user"></i>
                </button>
              </UserModel>
            </>
          ) : (
            <div className="d-flex ">
              <Link to="auth" className="btn btn-outline-light mx-2">
                Login
              </Link>
              <Link to="auth" className="btn btn-outline-light mx-2">
                sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
