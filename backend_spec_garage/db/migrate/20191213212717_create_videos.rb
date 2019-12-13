class CreateVideos < ActiveRecord::Migration[6.0]
  def change
    create_table :videos do |t|
      t.string :youtube_link
      t.belongs_to :car, null: false, foreign_key: true

      t.timestamps
    end
  end
end
