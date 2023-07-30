import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';


export interface To_do_Instance extends Model{
    id: Number,
    title: String,
    done: Boolean
}

export const To_do = sequelize.define<To_do_Instance>('To_do', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title:{
        type: DataTypes.STRING
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    tableName: 'to_do',
    timestamps: false
})