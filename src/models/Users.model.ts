import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	ForeignKey,
	BelongsTo,
	HasMany,
} from "sequelize-typescript";
import Roles from "./Roles.model";
import Projects from "./Projects.model";

@Table({
	tableName: "users",
})
class Users extends Model {
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
	})
	email: string;

	@Column({
		type: DataType.STRING(100),
	})
	password: string;

	@Column({
		type: DataType.INTEGER,
	})
	@ForeignKey(() => Roles)
	roleId: number;

	@BelongsTo(() => Roles)
	role: Roles;

	@HasMany(() => Projects)
	projects: Projects[];
}

export default Users;
