const resolvers = {
  Query: {
    restaurantInfo: async (_, __, { db }) => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM restaurant_info LIMIT 1", (err, results) => {
          if (err) {
            reject(err);
          } else {
            const restaurant = results[0];
            resolve({
              name: restaurant.name,
              menu: restaurant.menu.split(','),
              hours: restaurant.hours
            });
          }
        });
      });
    }
  }
};

module.exports = resolvers;