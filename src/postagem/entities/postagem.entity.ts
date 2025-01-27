import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_postagens"}) //CREATE TABLE tb_postagens
export class Postagem{

    @ApiProperty()
    @PrimaryGeneratedColumn() // INT AUTO_INCREMENT PRIMARY KEY
    id: number;

    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto - tem a ver com a aplicação
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL - configura lá na tabela do banco de dados
    titulo: string;

    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false}) // VARCHAR(1000) NOT NULL
    texto: string;

    @ApiProperty()
    @UpdateDateColumn()
    data: Date; // guarda data e hora

    @ApiProperty({type: () => Tema})
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema;

    @ApiProperty({type: () => Usuario})
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;

}