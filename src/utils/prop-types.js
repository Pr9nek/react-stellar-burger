import PropTypes from "prop-types";

export const cardPropType = PropTypes.shape({
  image: PropTypes.string,
  name: PropTypes.string,
  count: PropTypes.number,
  price: PropTypes.number,
  //укажите здесь prop-types для ингридиента
});

export const listItemPropType = PropTypes.shape({
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  //укажите здесь prop-types для ингридиента
});
