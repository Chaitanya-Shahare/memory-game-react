import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function Card({
  val,
  isDisabled,
  isRemoved = false,
  selectCard,
  index,
  isDisplay = false,
}) {
  const [isDisplayed, setIsDisplayed] = useState(isDisplay);

  const handleOnClick = () => {
    if (isDisabled) return;
    selectCard(index);
    setIsDisplayed(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisplayed(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [isDisplayed]);
  return (
    <div
      className={`card card--${isDisplayed ? "hidden" : "displayed"} card--${
        isDisabled ? "disabled" : ""
      }
        card--${isRemoved ? "removed" : ""}
      `}
      onClick={handleOnClick}
    >
      {isDisplayed ? val : null}
    </div>
  );
}

Card.propTypes = {
  val: PropTypes.number.isRequired,
};
