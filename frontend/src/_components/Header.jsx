import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authenticationService } from '@/_services';
import { history } from '@/_helpers';
import { DarkModeToggle } from './DarkModeToggle';
import cx from 'classnames';
import LogoIcon from '../Editor/Icons/logo.svg';

export const Header = function Header({ switchDarkMode, darkMode }) {
  const [pathName, setPathName] = useState(document.location.pathname);

  useEffect(() => {
    setPathName(document.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.location.pathname]);

  function logout() {
    authenticationService.logout();
    history.push('/login');
  }

  function openSettings() {
    history.push('/settings');
  }

  const { first_name, last_name, admin } = authenticationService.currentUserValue;

  return (
    <header className="navbar tabbed-navbar navbar-expand-md navbar-light d-print-none">
      <div className="container-xl">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
          {/* <span className="navbar-toggler-icon"></span> */}
        </button>
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0">
          <Link to={'/'}>
            <LogoIcon />
          </Link>
        </h1>

        <ul className="navbar-nav d-none d-lg-flex">
          <li className={cx(`nav-item mx-3`, { active: pathName === '/' })}>
            <Link to={'/'} className="nav-link">
              <span className="nav-link-icon d-md-none d-lg-inline-block">
                <img className="svg-icon" src="/assets/images/icons/apps.svg" width="15" height="15" />
              </span>
              <span className="nav-link-title">Apps</span>
            </Link>
          </li>

          <li className={cx(`nav-item mx-3`, { active: pathName === '/library' })}>
            <Link to={'/library'} className="nav-link mx-2">
              <span className="nav-link-icon d-md-none d-lg-inline-block">
                <img className="svg-icon" src="https://www.svgrepo.com/show/39547/gallery.svg" width="15" height="15" />
              </span>
              <span className="nav-link-title">Library</span>
            </Link>
          </li>
        </ul>

        <div className="navbar-nav flex-row order-md-last">
          <div className="p-1 m-1 d-flex align-items-center">
            <DarkModeToggle switchDarkMode={switchDarkMode} darkMode={darkMode} />
          </div>
          <div className="nav-item dropdown ms-2 user-avatar-nav-item">
            <a
              href="#"
              className="nav-link d-flex lh-1 text-reset p-0"
              data-bs-toggle="dropdown"
              aria-label="Open user menu"
              data-testid="userAvatarHeader"
            >
              <div className="d-xl-block">
                <span className="avatar bg-secondary-lt">
                  {first_name ? first_name[0] : ''}
                  {last_name ? last_name[0] : ''}
                </span>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              {admin && (
                <Link data-testid="settingsBtn" to="/users" className="dropdown-item">
                  Manage Users
                </Link>
              )}
              {admin && (
                <Link data-tesid="settingsBtn" to="/groups" className="dropdown-item">
                  Manage Groups
                </Link>
              )}
              <Link data-testid="settingsBtn" to="#" onClick={openSettings} className="dropdown-item">
                Profile
              </Link>
              <Link data-testid="logoutBtn" to="#" onClick={logout} className="dropdown-item">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
