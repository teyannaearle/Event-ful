const CategorySwitch = (category) => {
  let item = "";
  switch (category) {
    case "catering":
      item = "Caterers";
      break;
    case "djs":
      item = "Djs";
      break;
    case "musicians":
      item = "Musicians";
      break;
    case "party_rental":
      item = "Equipment Rentals";
      break;
    case "photographers":
      item = "Photographers";
      break;
    case "videographers":
      item = "Videographers";
      break;
    case "venues":
      item = "Venues";
      break;
    case "balloons":
      item = "Balloon Services";
      break;
    case "floral":
      item = "Floral Designers";
      break;
    case "party_magician":
      item = "Magicians";
      break;
    case "party_characters":
      item = "Character Actors";
      break;
    case "party_clown":
      item = "Clowns";
      break;
    default:
      item = "";
  }

  return item;
};

export default CategorySwitch;
