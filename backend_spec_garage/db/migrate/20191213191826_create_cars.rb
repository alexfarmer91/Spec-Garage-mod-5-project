class CreateCars < ActiveRecord::Migration[6.0]
  def change
    create_table :cars do |t|
      t.integer :year
      t.string :make
      t.string :model
      t.string :details
      t.string :nickname
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
