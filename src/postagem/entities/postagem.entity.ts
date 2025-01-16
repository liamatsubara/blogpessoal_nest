import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({name: "tb_postagens"}) //CREATE TABLE tb_postagens
export class Postagem{

    @PrimaryGeneratedColumn() // INT AUTO_INCREMENT PRIMARY KEY
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto - tem a ver com a aplicação
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL - configura lá na tabela do banco de dados
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false}) // VARCHAR(1000) NOT NULL
    texto: string;

    @UpdateDateColumn()
    data: Date; // guarda data e hora

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema;

}