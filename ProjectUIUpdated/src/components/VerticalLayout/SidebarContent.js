import React, { useEffect, useRef, useCallback } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import withRouter from "../Common/withRouter"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  const activateParentDropdown = useCallback(item => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }, [])

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement

      if (item && item.classList.contains("active")) {
        item.classList.remove("active")
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show")
        }

        parent.classList.remove("mm-active")
        const parent2 = parent.parentElement

        if (parent2) {
          parent2.classList.remove("mm-show")

          const parent3 = parent2.parentElement
          if (parent3) {
            parent3.classList.remove("mm-active") // li
            parent3.childNodes[0].classList.remove("mm-active")

            const parent4 = parent3.parentElement // ul
            if (parent4) {
              parent4.classList.remove("mm-show") // ul
              const parent5 = parent4.parentElement
              if (parent5) {
                parent5.classList.remove("mm-show") // li
                parent5.childNodes[0].classList.remove("mm-active") // a tag
              }
            }
          }
        }
      }
    }
  }

  const path = useLocation()
  const activeMenu = useCallback(() => {
    const pathName = path.pathname
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    removeActivation(items)

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  }, [path.pathname, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  }, [])

  useEffect(() => {
    new MetisMenu("#side-menu")
    activeMenu()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    activeMenu()
  }, [activeMenu])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")}</li>

            {/* Master Menu */}
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Master")}</span>
              </Link>
              <ul className="sub-menu">
                {/* Branch with Submenu */}
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Branch")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/BranchAdd">{props.t("Branch")}</Link>
                    </li>

                    <li>
                      <Link to="/BranchArea">{props.t("Branch Area")}</Link>
                    </li>
                    <li>
                      <Link to="/BranchType">{props.t("Branch Type")}</Link>
                    </li>
                  </ul>
                </li>

                {/* Items with Submenu */}
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Items")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/ItemAdd">{props.t("Item Add")}</Link>
                    </li>
                    <li>
                      <Link to="/ItemGroup">{props.t("Item Group")}</Link>
                    </li>
                    <li>
                      <Link to="/ItemOem">{props.t("Item Oem")}</Link>
                    </li>
                    <li>
                      <Link to="/ItemName">{props.t("Item Name")}</Link>
                    </li>
                    <li>
                      <Link to="/ItemUnit">{props.t("Item Unit")}</Link>
                    </li>
                  </ul>
                </li>

                {/* Cars with Submenu */}
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Cars")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/carmake">{props.t("Car Make")}</Link>
                    </li>
                    <li>
                      <Link to="/CarModel">{props.t("Car Model")}</Link>
                    </li>
                  </ul>
                </li>

                {/* Other Menu Items (No Submenus) */}
                <li>
                  <Link to="/Country">{props.t("Country")}</Link>
                </li>
                <li>
                  <Link to="/Paytype">{props.t("PayType")}</Link>
                </li>
                <li>
                  <Link to="/Designation">{props.t("Designation")}</Link>
                </li>

                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Vendor")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/Vendor?clickedVendorType=1">
                        {props.t("Vendor Add")}
                      </Link>
                    </li>

                    <li>
                      <Link to="/Vendor?clickedVendorType=2">
                        {props.t("Manufacture Add")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/VendorGroup">{props.t("Vendor Group")}</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/Department">{props.t("Department")}</Link>
                </li>

                <li>
                  <Link to="/Business">{props.t("Business")}</Link>
                </li>

                <li>
                  <Link to="/Employee">{props.t("Employee")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Sales ")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Sales")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/SalesCustomer">
                        {props.t("Sales To Customer ")}
                      </Link>
                    </li>

                    <li>
                      <Link to="/SalesToJobCard">
                        {props.t("Sales To Card ")}
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Sales Return ")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/SalesCustomer">
                        {props.t("Return From Customer")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/SalesCustomer">
                        {props.t("Retrun From Card ")}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Workshop ")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Cards")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/Card">{props.t("Card New  ")}</Link>
                    </li>

                    <li>
                      <Link to="/Card">{props.t("Requirements  ")}</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Sales Return ")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/SalesCustomer">
                        {props.t("Return From Customer")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/SalesCustomer">
                        {props.t("Retrun From Card ")}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Stock Entry  ")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Print Barcode ")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/Card">{props.t("Inventory/Purchase  ")}</Link>
                    </li>

                    <li>
                      <Link to="/Card">{props.t("Duplicate Sticker   ")}</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Sales Return ")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/SalesCustomer">
                        {props.t("Return From Customer")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/SalesCustomer">
                        {props.t("Retrun From Card ")}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Transfers  ")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Create Picking List  ")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/Card">{props.t("Branch Wise   ")}</Link>
                    </li>

                    <li>
                      <Link to="/Card">{props.t("Area Wise   ")}</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/Card">{props.t("Transfer  Order    ")}</Link>
                </li>

                <li>
                  <Link to="/PurchaseBranch">
                    {props.t("Branch Purchase     ")}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
