import { BlackListToken } from "./blackListToken/BlackListToken.js";
import { Events } from "./events/Events.js";
import { Locations } from "./locations/Locations.js";
import { Plates } from "./plates/Plates.js";
import { Users } from "./users/Users.js";

// Associations
Users.hasMany(Events, { foreignKey: "userId" });
Events.belongsTo(Users, { foreignKey: "userId" });
Plates.hasMany(Events, { foreignKey: "plateId" });
Events.belongsTo(Plates, { foreignKey: "plateId" });
Locations.hasMany(Events, { foreignKey: "locationId" });
Events.belongsTo(Locations, { foreignKey: "locationId" });

export default {
  users: Users,
  plates: Plates,
  events: Events,
  locations: Locations,
  blackListToken: BlackListToken,
};
