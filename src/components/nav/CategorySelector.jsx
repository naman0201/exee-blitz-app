import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory } from "../../features/product/productSlice";
function CategorySelector() {
  const { categories, selectedCategory } = useSelector((state) => {
    return state.products;
  });
  const title = selectedCategory;
  const dispatch = useDispatch();
  const handleMouseEnter = (e) => {
    dispatch(setSelectedCategory(e.target.innerText));
  };
  return (
    <div className="dropdown mb-3 mb-lg-0">
      <button
        className="btn btn-outline-success text-white dropdown-toggle"
        type="button"
        id="dropDownButton1"
        data-bs-toggle="dropdown"
      >
        {title}
      </button>
      <ul className="dropdown-menu">
        {categories.map((category) => (
          <li key={category} onMouseEnter={handleMouseEnter}>
            <a href="#" className="dropdown-item pointer">
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategorySelector;
