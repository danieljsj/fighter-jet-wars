// Create object inheritance tree

var Entity = {};

	var Building = Object.create(Entity);

	var Projectile = Object.create(Entity);

		var Plane = Object.create(Projectile);

			var Player = Object.create(Plane);

			var Computer = Object.create(Plane);

		var Laser = Object.create(Projectile);








function Entity = {};

	var Building = Object.create(Entity);

	var Projectile = Object.create(Entity);

		var Plane = Object.create(Projectile);

			var Player = Object.create(Plane);

			var Computer = Object.create(Plane);

		var Laser = Object.create(Projectile);


