import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	ForeignKey,
	BelongsTo,
	HasMany,
	BeforeCreate,
	BeforeUpdate,
} from "sequelize-typescript";
import bcrypt from "bcrypt";

import Roles from "./Roles.model.js";
import Projects from "./Projects.model.js";

@Table({
	tableName: "users",
})
class Users extends Model {
	@Column({
		type: DataType.STRING(100),
		unique: true,
	})
	username: string;

	@Column({
		type: DataType.STRING(100),
	})
	nombre: string;

	@Column({
		type: DataType.STRING(100),
	})
	apellido: string;

	@Column({
		type: DataType.STRING(100),
		unique: true,
	})
	email: string;

	@Column({
		type: DataType.STRING(100),
	})
	password: string;

	@Column({
		type: DataType.STRING(25),
	})
	phone?: string;

	@Column({
		type: DataType.STRING(25),
	})
	cedula?: string;

	@Column({
		type: DataType.INTEGER,
	})
	@ForeignKey(() => Roles)
	roleId: number;

	@BelongsTo(() => Roles)
	role: Roles;

	@HasMany(() => Projects)
	projects: Projects[];

	@BeforeUpdate
	@BeforeCreate
	static async encryptPassword(instance) {
		const salt = await bcrypt.genSalt(10);
		instance.dataValues.password = await bcrypt.hash(
			instance.dataValues.password,
			salt
		);
	}

	async comparePassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.dataValues.password);
	}
}

// const encryptPassword = async (instance: Users) => {
// 	const salt = await bcrypt.genSalt(10);
// 	console.log(instance.password);
// 	instance.password = await bcrypt.hash(instance.password, salt);
// };

// Users.beforeCreate("encryptPassword", Users.encryptPassword);

export default Users;
