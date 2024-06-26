import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { BaseEntity } from "@ocular/types"
import { generateEntityId } from "../utils/generate-entity-id"
import { Organisation } from "./organisation"
import { DbAwareColumn } from "../../../utils/src/db-aware-column"
import { OAuth } from "./oauth"


@Entity()
export class Event extends BaseEntity {
  /**
   * The name of the entity.
   */
  @Column({ type: "varchar", nullable: false })
  name: string

  @Column({ type: "varchar", nullable: true})
  description?: string

  @Column({ type: "varchar", nullable: true })
  oauth_id: string;

  @ManyToOne(() => OAuth, (oauth) => oauth.events)
  @JoinColumn({ name: 'oauth_id', referencedColumnName: 'id' })
  oauth: OAuth;

  @Column({ type: "varchar", nullable: true })
  organisation_id: string;

  @ManyToOne(() => Organisation, (organisation) => organisation.events)
  @JoinColumn({ name: 'organisation_id', referencedColumnName: 'id' })
  organisation: Organisation;

  @Column({ type: "varchar", nullable: true })
  component_id: string;
  /**
  * @apiIgnore
  */
  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "comp")
  }
}