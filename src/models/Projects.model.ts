import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import Users from "./Users.model.js";

@Table({
	tableName: "projects",
})
class Projects extends Model {
	@Column({
		type: DataType.STRING(255),
	})
	titulo: string;

	@Column({
		type: DataType.STRING(255),
	})
	descripcion: string;

	@Column({
		type: DataType.INTEGER,
	})
	@ForeignKey(() => Users)
	encargadoId: number;

	@BelongsTo(() => Users)
	encargado: Users;

	@Column({
		type: DataType.INTEGER,
	})
	@ForeignKey(() => Users)
	userId: number;

	@BelongsTo(() => Users)
	user: Users;

	@Column({
		type: DataType.STRING(50),
	})
	municipioId: string;

	@Column({
		type: DataType.STRING(100),
	})
	municipio: string;

	@Column({
		type: DataType.STRING(50),
	})
	parroquiaId: string;

	@Column({
		type: DataType.STRING(100),
	})
	parroquia: string;

	@Column({
		type: DataType.STRING(50),
	})
	sectorId: string;

	@Column({
		type: DataType.STRING(100),
	})
	sector: string;

	@Column({
		type: DataType.STRING(200),
	})
	puntoDeReferencia: string;

	@Column({
		type: DataType.STRING(75),
	})
	coordenadasLat: string;

	@Column({
		type: DataType.STRING(75),
	})
	coordenadasLong: string;

	@Column({
		type: DataType.INTEGER,
	})
	anoAprob: number;

	@Column({
		type: DataType.STRING(200),
	})
	poblacionBeneficiada: string;

	@Column({
		type: DataType.STRING(200),
	})
	propuesta: string;

	@Column({
		type: DataType.STRING(255),
	})
	status: string;

	@Column({
		type: DataType.STRING(255),
	})
	observacion: string;

	@Column({
		type: DataType.DATE,
	})
	lapsoInicio: Date;

	@Column({
		type: DataType.DATE,
	})
	lapsoFin: Date;

	@Column({
		type: DataType.STRING(100),
	})
	ente: string;

	@Column({
		type: DataType.STRING(30),
	})
	entePhone: string;

	@Column({
		type: DataType.STRING(100),
	})
	enteEmail: string;
}

export default Projects;
