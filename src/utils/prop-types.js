import PropTypes from "prop-types";

export const cardPropType = {
  ingredient: PropTypes.object.isRequired
};

// export const burgerPropType = {
//   data: PropTypes.array.isRequired
// }

// export const constructorPropType = {
//   data: PropTypes.array.isRequired
// }

export const orderPropType = {
  price: PropTypes.number.isRequired
};

export const listItemPropType = PropTypes.shape({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  //укажите здесь prop-types для ингридиента
});

export const navPropType = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export const modalPropType = PropTypes.shape({
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.elementType.isRequired
  //укажите здесь prop-types для ингридиента
});
