import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	HasMany,
} from "sequelize-typescript";
import Projects from "./Projects.model";

@Table({
	tableName: "status",
})
class Status extends Model {
	@Column({
		type: DataType.STRING(100),
	})
	status: string;

	@HasMany(() => Projects)
	projects: Projects[];
}

export default Status;
