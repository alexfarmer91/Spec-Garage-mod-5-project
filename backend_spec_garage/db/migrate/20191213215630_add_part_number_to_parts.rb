class AddPartNumberToParts < ActiveRecord::Migration[6.0]
  def change
    add_column :parts, :part_number, :string
  end
end
