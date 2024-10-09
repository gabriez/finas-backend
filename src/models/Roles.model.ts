import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	HasMany,
} from "sequelize-typescript";
import Users from "./Users.model";

@Table({
	tableName: "roles",
})
class Roles extends Model {
	@Column({
		type: DataType.STRING(100),
	})
	rol: string;

	@HasMany(() => Users)
	users: Users[];
}

export default Roles;
