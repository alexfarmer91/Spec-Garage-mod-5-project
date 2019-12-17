class CreateCarLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :car_likes do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :car, null: false, foreign_key: true

      t.timestamps
    end
  end
end
