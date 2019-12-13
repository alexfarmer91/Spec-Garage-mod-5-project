class CreateParts < ActiveRecord::Migration[6.0]
  def change
    create_table :parts do |t|
      t.string :part_type
      t.string :brand
      t.string :version
      t.string :details
      t.integer :rating
      t.belongs_to :car, null: false, foreign_key: true

      t.timestamps
    end
  end
end
