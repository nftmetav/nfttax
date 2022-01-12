import React from "react";
import UserMenu from "./UserMenu";
import { connect } from "react-redux";

function Header({ address }) {
  return (
    <div>
      <header className="sticky top-0 border-b border-gray-200 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 -mb-px">
            {/* Header: Left side */}
            <div className="flex">{/* Hamburger button */}</div>

            {/* Header: Right side */}
            <div className="flex items-center">
              {/* <SearchModal /> */}
              {/* <Help /> */}
              {/*  Divider */}
              {/* <hr className="w-px h-6 bg-gray-200 mx-3" /> */}
              <UserMenu userName={address} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => ({
  address: state.auth.addresses[0],
});

export default connect(mapStateToProps, null)(Header);
