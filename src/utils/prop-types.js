import PropTypes from "prop-types";

export const cardPropType = PropTypes.shape({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  //укажите здесь prop-types для ингридиента
});

export const listItemPropType = PropTypes.shape({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  //укажите здесь prop-types для ингридиента
});

export const navPropType = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired
}
